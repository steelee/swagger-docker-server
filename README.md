Run webserver:
sudo docker run -v $PWD/dist/:/app -p 80:80 php-server 

Build webserver:
sudo docker build -t php-server .

Start local SQL:
sudo docker run --name sql-server -e MYSQL_ROOT_PASSWORD=123 -d mysql/mysql-server:latest

Add SQL template:
sudo docker exec -i 8fce3a9bc94a mysql -uroot -p123 < init.sql 
