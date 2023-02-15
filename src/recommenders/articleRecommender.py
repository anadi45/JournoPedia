import sys
import pandas as pd
from pandas import json_normalize
import json

# JSON Data
json_data = sys.argv[1]
id = sys.argv[2]

# Converting JSON to DataFrame
dict = json.loads(json_data, strict=False)
df = json_normalize(dict) 

# Stemming
import nltk
from nltk.stem.porter import PorterStemmer
ps = PorterStemmer()

def stem(text):
    y = []
    
    for i in text.split():
        y.append(ps.stem(i))
    
    return " ".join(y)

df['tags'] = df['tags'].apply(stem)

# Text Vectorization (Bag of Words Technique)
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(df['tags']).toarray()

# Create similarity matrix
from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity(vectors)


# Recommender
def recommend(id):
    index = df[df['id'] == id].index[0]
    distances =  similarity[index]
    article_list = sorted(list(enumerate(distances)),reverse=True, key=lambda x:x[1])[1:]

    for i in article_list:
        print(df.iloc[i[0]].id)
    # print(article_list)
    
recommend(id)


