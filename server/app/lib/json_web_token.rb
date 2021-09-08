# frozen_string_literal: true
require 'net/http'
require 'uri'
# require "open-uri"

class JsonWebToken
  def self.verify(token)
    JWT.decode(token, nil,
      true, # Verify the signature of this token
      algorithm: 'RS256',
      iss: auth0[:client_url],
      verify_iss: true,
      aud: auth0[:api_audience],
      verify_aud: true) { |header| jwks_hash[header['kid']] }
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get_response URI("#{auth0[:client_url]}.well-known/jwks.json")
    jwks_keys = Array(JSON.parse(jwks_raw.body)['keys'])
    Hash[
      jwks_keys
      .map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(
            Base64.decode64(k['x5c'].first)
          ).public_key
        ]
      end
    ]
  end

  private

  def self.auth0
    Rails.application.credentials[Rails.env.to_sym][:auth0]
  end
end
