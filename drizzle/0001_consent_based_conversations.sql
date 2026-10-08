CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  consented_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_activity_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS conversation_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  source_id TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS conversation_messages_by_conversation
  ON conversation_messages(conversation_id, created_at);

CREATE INDEX IF NOT EXISTS conversations_by_activity
  ON conversations(last_activity_at);
