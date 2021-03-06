#!/bin/bash
chown www-data:www-data /app -R

if [ "$ALLOW_OVERRIDE" = "**False**" ]; then
    unset ALLOW_OVERRIDE
else
    sed -i "s/AllowOverride None/AllowOverride All/g" /etc/apache2/apache2.conf
    a2enmod rewrite
fi
echo 'Header always set Access-Control-Allow-Origin "*"' >> /etc/apache2/apache2.conf
echo 'Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT' >> /etc/apache2/apache2.conf
echo 'Header always set Access-Control-Allow-Headers "*"' >> /etc/apache2/apache2.conf
a2enmod headers
source /etc/apache2/envvars
tail -F /var/log/apache2/* &
exec apache2 -D FOREGROUND
