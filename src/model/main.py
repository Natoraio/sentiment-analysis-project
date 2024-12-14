import os
import re
import sys
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
 
class Model:
 
  map_labels = {
    "LABEL_0": "negative",
    "LABEL_1": "neutral",
    "LABEL_2": "positive",
  }
 
  root_path = os.getcwd() + "/src/models/finetuning-distilbert-sentiment-model"
 
  def __init__(self):
    self.tokenizer = AutoTokenizer.from_pretrained(self.root_path)
    self.model = AutoModelForSequenceClassification.from_pretrained(self.root_path)
    self.sentiment_pipeline = pipeline("text-classification", model=self.model, tokenizer=self.tokenizer)
 
  def get_attentions(self, text):
    inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = self.model(**inputs, output_attentions=True)
    attention = outputs.attentions[-1].squeeze(0)
    attention_scores = attention.mean(dim=0).detach().numpy()
    token_importance = attention_scores.sum(axis=0)
    tokens = self.tokenizer.convert_ids_to_tokens(inputs["input_ids"].squeeze().tolist())
 
    word_importance = []
    for token, importance in zip(tokens, token_importance):
      if token.startswith("##"):
        word_importance[-1][0] += token[2:]
      else:
        word_importance.append([token, importance])
 
    word_importance = [ [token, float(importance)] for token, importance in zip(tokens, token_importance) if token not in ["[CLS]", "[SEP]"] ]
 
    return word_importance
 
  def analyse(self, text):
    result = self.sentiment_pipeline(text)
    sentiment = self.map_labels[result[0]["label"]]
    score = result[0]["score"]
 
    return sentiment, score, self.get_attentions(text)
 
if __name__ == "__main__":
  text = sys.argv[1]
  model = Model()
 
  sentiment, score, attentions = model.analyse(text)
 
  result = {
    "sentiment": sentiment,
    "score": score,
    "attentions": list(map(lambda x: { "word": x[0], "score": x[1] }, attentions))
  }
 
  print(json.dumps(result))
 