# AGENTS.md

## Project: rails-notification-test

A Rails application for testing notifications (mail, browser) and Solid Queue.

## Commit Style

- Use one-line commits: `git commit -m "description"`
- No prefixes like `feat:`, `add:`, `fix:`
- Example: `git commit -m "Initialize rails app with mysql and solid queue"`

## Setup

- Database: MySQL (not SQLite)
- Background job: Solid Queue
- Mail: Mailhog for local email testing

## Commands

```bash
# Install dependencies
bundle install

# Create database
rails db:create db:migrate

# Start Rails server
bin/dev

# Start Mailhog (already installed locally)
mailhog

## Notes

- This is a fresh project - no existing code to reference
- Will test: ActionMailer, browser notifications, Solid Queue
