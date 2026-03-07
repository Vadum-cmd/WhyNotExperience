# Ruby Upgrade Guide

Your system has Ruby 2.6.10, but this project requires Ruby 3.2.0+.

## Option 1: Using rbenv (Recommended)

### Install rbenv

```bash
# Install rbenv via Homebrew
brew install rbenv ruby-build

# Add rbenv to your shell
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc

# Verify installation
rbenv --version
```

### Install Ruby 3.2.0

```bash
# Install Ruby 3.2.0
rbenv install 3.2.0

# Set it as global default
rbenv global 3.2.0

# Verify
ruby -v  # Should show 3.2.0

# Install bundler
gem install bundler
```

### Set Ruby version for this project

```bash
cd backend-rails
rbenv local 3.2.0
ruby -v  # Should show 3.2.0
```

---

## Option 2: Using Homebrew (Simpler, but system-wide)

```bash
# Install Ruby 3.2.0 via Homebrew
brew install ruby@3.2

# Add to PATH (add this to ~/.zshrc)
echo 'export PATH="/opt/homebrew/opt/ruby@3.2/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
ruby -v  # Should show 3.2.0

# Install bundler
gem install bundler
```

---

## Option 3: Using RVM

```bash
# Install RVM
curl -sSL https://get.rvm.io | bash -s stable

# Reload shell
source ~/.rvm/scripts/rvm

# Install Ruby 3.2.0
rvm install 3.2.0
rvm use 3.2.0 --default

# Verify
ruby -v  # Should show 3.2.0

# Install bundler
gem install bundler
```

---

## After Installing Ruby 3.2.0

1. **Navigate to backend directory:**
   ```bash
   cd backend-rails
   ```

2. **Install gems:**
   ```bash
   bundle install
   ```

3. **Set up database:**
   ```bash
   bundle exec rails db:create
   bundle exec rails db:migrate
   bundle exec rails db:seed
   ```

4. **Start server:**
   ```bash
   bundle exec rails server
   ```

---

## Troubleshooting

### "Command not found: #"
- Don't copy/paste comments (lines starting with `#`)
- Only run the actual commands

### "rbenv: command not found"
- Make sure you added rbenv to your shell config
- Run: `source ~/.zshrc` or restart terminal

### "Permission denied"
- Don't use `sudo` with rbenv/rvm
- If using system Ruby, you might need `sudo`, but it's better to use a version manager

### Still seeing old Ruby version
- Check which Ruby: `which ruby`
- Restart your terminal
- Run: `rbenv rehash` (if using rbenv)

---

## Quick Check Commands

```bash
# Check Ruby version
ruby -v

# Check which Ruby
which ruby

# Check rbenv (if installed)
rbenv versions

# Check if bundler is installed
bundle --version
```

