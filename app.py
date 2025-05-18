import os
import json
import sqlite3
from flask import Flask, render_template, request, jsonify
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from datetime import date  # Needed for today's date in journal

app = Flask(__name__)

# Set API Key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("Please set the GROQ_API_KEY environment variable.")

# Initialize ChatGroq LLM
llm = ChatGroq(
    model="llama3-70b-8192",
    temperature=0.7,
    max_tokens=150,  # Slightly more to allow 2 sentences
    timeout=10,
    max_retries=2,
)

# Chat prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly and supportive mental health AI assistant. Always respond in two short, comforting sentences."),
    ("human", "{input}")
])


# Database setup for journal entries
DATABASE = "journal_entries.db"

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS journal (
                date TEXT PRIMARY KEY,
                content TEXT
            )
        ''')
        conn.commit()

init_db()  # Initialize database if not exists

# Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat")
def chat_page():
    return render_template("chat.html")

@app.route("/games")
def games():
    return render_template("games.html")

@app.route("/bubble")
def bubble_game():
    return render_template("bubble.html")

@app.route("/coloring")
def coloring_game():
    return render_template("coloring.html")

@app.route("/puzzle")
def puzzle_game():
    return render_template("puzzle.html")

@app.route("/resources")
def resources():
    return render_template("resources.html")

# Chatbot Response
@app.route("/get", methods=["POST"])
def chat():
    try:
        user_text = request.form["msg"]
        chain = prompt | llm
        response = chain.invoke({"input": user_text})
        return jsonify({"response": response.content})
    except Exception as e:
        print(f"❌ Chatbot Error: {e}")
        return jsonify({"error": "An error occurred. Please try again later."})

# Save Journal Entry
@app.route("/save_journal", methods=["POST"])
def save_journal():
    data = request.json
    date = data.get("date")
    content = data.get("content")

    if date and content:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO journal (date, content) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET content = ?", (date, content, content))
            conn.commit()
        return jsonify({"message": "Journal entry saved successfully!"}), 200
    return jsonify({"error": "Invalid data"}), 400

# Get Journal Entry by Date
@app.route("/get_journal/<date>", methods=["GET"])
def get_journal(date):
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT content FROM journal WHERE date = ?", (date,))
        row = cursor.fetchone()
        content = row[0] if row else ""
    return jsonify({"date": date, "content": content})

# ✅ Write Journal (needed for url_for('write_journal'))
@app.route("/journal")
def write_journal():
    today = date.today().isoformat()
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT content FROM journal WHERE date = ?", (today,))
        row = cursor.fetchone()
        existing_entry = row[0] if row else ""
    return render_template("journal.html", today=today, existing_entry=existing_entry)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
