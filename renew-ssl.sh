#!/bin/bash  
  
cd ~/employee-profile  
  
docker run --rm \  
  -v $(pwd)/certbot/www:/var/www/certbot \  
  -v $(pwd)/certbot/conf:/etc/letsencrypt \  
  certbot/certbot renew  
  
docker compose restart nginx