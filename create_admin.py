from supabase import create_client
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
import os

load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')
supabase = create_client(url, key)

# principal account banao
name = input("Principal ka naam daalo: ")
username = input("Username daalo (e.g. principal): ")
password = input("Password daalo: ")

result = supabase.table('users').insert({
    'name': name,
    'username': username,
    'password_hash': generate_password_hash(password),
    'role': 'principal',
    'class_assigned': None
}).execute()

if result.data:
    print(f"\n✅ Principal account ready!")
    print(f"   Username: {username}")
    print(f"   Login karo: http://localhost:5000/login")
else:
    print("❌ Error. Check Supabase connection.")
