source "https://rubygems.org"

ruby "3.0.0"

# Framework
gem "rails", "~> 7.1.5", ">= 7.1.5.1"

# Banco de dados
gem "pg", "~> 1.1"

# Servidor web
gem "puma", ">= 5.0"

# JSON serialization
gem "active_model_serializers"

# Gerenciamento de variáveis de ambiente
gem "dotenv-rails"

# Performance
gem "bootsnap", require: false

# Cross-Origin (para conectar com o frontend React)
gem "rack-cors"

# Compatibilidade com Windows (se necessário)
gem "tzinfo-data", platforms: %i[ mswin mswin64 mingw x64_mingw jruby ]


group :development, :test do
  # Testes
  gem "rspec-rails"
  gem "factory_bot_rails"
  gem "faker"

  # Debugger
  gem "pry"
end

group :development do
  # Linting e boas práticas
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
end
