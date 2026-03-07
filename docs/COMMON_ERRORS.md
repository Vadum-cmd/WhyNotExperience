# Common Errors and Solutions

## Error: "zsh: command not found: #"

**Problem:** You're trying to run a comment line (starting with `#`)

**Solution:** 
- Don't copy/paste lines that start with `#` - those are comments
- Only run the actual commands

**Example:**
```bash
# ❌ WRONG - Don't run this:
# bundle install

# ✅ CORRECT - Run this:
bundle install
```

---

## Error: "Your Ruby version is 2.6.10, but your Gemfile specified 3.2.0"

**Problem:** Your system Ruby is too old

**Solution:** Install Ruby 3.2.0+ using a version manager

**Quick Fix:**
```bash
# Install rbenv (if not installed)
brew install rbenv ruby-build

# Add to shell
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc

# Install Ruby 3.2.0
rbenv install 3.2.0
rbenv global 3.2.0

# Verify
ruby -v  # Should show 3.2.0
```

See [RUBY_UPGRADE.md](RUBY_UPGRADE.md) for detailed instructions.

---

## Error: "bundle: command not found"

**Problem:** Bundler gem is not installed

**Solution:**
```bash
gem install bundler
```

---

## Error: "Could not find gem 'rails'"

**Problem:** Gems not installed yet

**Solution:**
```bash
cd backend-rails
bundle install
```

---

## Error: "Database does not exist"

**Problem:** PostgreSQL database not created

**Solution:**
```bash
# Create database
createdb boat_db

# Or use Rails
cd backend-rails
bundle exec rails db:create
```

---

## Error: "Port 3001 already in use"

**Problem:** Another process is using port 3001

**Solution:**
```bash
# Find what's using the port
lsof -ti:3001

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use a different port
PORT=3002 bundle exec rails server
```

---

## Error: "npm: command not found"

**Problem:** Node.js not installed

**Solution:**
```bash
# Install Node.js via Homebrew
brew install node

# Verify
node -v
npm -v
```

---

## Error: "psql: command not found"

**Problem:** PostgreSQL not installed

**Solution:**
```bash
# Install PostgreSQL via Homebrew
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14
```

---

## Error: "CORS policy" in browser

**Problem:** Frontend can't connect to backend

**Solution:**
- Make sure backend is running on port 3001
- Check `REACT_APP_API_URL` in `frontend-web/.env`
- Verify CORS is configured in Rails (already done in `config/application.rb`)

---

## Tips for Avoiding Errors

1. **Read error messages carefully** - they usually tell you what's wrong
2. **Don't copy comments** - lines starting with `#` are not commands
3. **Check prerequisites** - Make sure Ruby, Node, PostgreSQL are installed
4. **Use version managers** - rbenv for Ruby, nvm for Node.js
5. **Read the full error** - Often the solution is in the error message

