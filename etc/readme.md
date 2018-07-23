i used this for making ssl localhost


openssl genrsa -des3 -out rootCA.key 2048
i used passphrase: opencat

then i used this command: using my passphrase
ANSWERS: US, CALIFORNIA, SD, ESE, IT, Local Certificate, hamed@farsales.com

openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem