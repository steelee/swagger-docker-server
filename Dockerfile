FROM ubuntu:trusty

# Install base packages
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get -yq install \
        curl \
        apache2 \
        libapache2-mod-php5 \
        php5-mysql \
        php5-mcrypt \
        php5-gd \
        php5-curl \
        php-pear \
        php-apc && \
    rm -rf /var/lib/apt/lists/* && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN /usr/sbin/php5enmod mcrypt
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    echo "DirectoryIndex index.php" >> /etc/apache2/apache2.conf && \ 
    sed -i "s/variables_order.*/variables_order = \"EGPCS\"/g" /etc/php5/apache2/php.ini

ENV ALLOW_OVERRIDE **False**

# Add image configuration and scripts
ADD config.sh /config.sh
RUN chmod 755 /*.sh

# Configure /app folder with sample app
RUN rm -rf /app
RUN mkdir -p /app && rm -fr /var/www/html && ln -s /app /var/www/html
COPY dist/ /app

EXPOSE 80
WORKDIR /app
CMD ["/config.sh"]
