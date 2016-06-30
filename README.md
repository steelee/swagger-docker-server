Run webserver:
sudo docker run -v $PWD/dist/:/app -p 80:80 php-server 

Build webserver:
sudo docker build -t php-server .

Start local SQL:
sudo docker run --name sql-server -e MYSQL_ROOT_PASSWORD=123 -d mysql/mysql-server:latest

Add SQL template:
sudo docker exec -i $(sudo docker ps -aqf "name=sql-server") mysql -uroot -p123 < init.sql 
