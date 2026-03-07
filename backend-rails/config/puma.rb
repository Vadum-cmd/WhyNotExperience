max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

port ENV.fetch("PORT") { 3001 }
environment ENV.fetch("RAILS_ENV") { "development" }

# pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }  # Commented out to avoid pidfile issues

workers ENV.fetch("WEB_CONCURRENCY") { 0 }  # Set to 0 for development to avoid fork issues

preload_app!

plugin :tmp_restart

