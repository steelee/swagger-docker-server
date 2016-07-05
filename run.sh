RED='\033[0;31m'
GRN='\033[0;32m'
ORG='\033[0;33m'
CYN='\033[0;36m'
GRY='\033[0;37m'
NC='\033[0m' # No Color

FILE="/tmp/out.$$"
GREP="/bin/grep"

echo -e "${GRN}This script will build and run the SQL and Webserver docker containers${NC}"
# Make sure only root can run our script
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi
if [ ! -f /usr/bin/docker ]; then
    echo -e "${RED}Docker is not installed! See https://docs.docker.com/engine/installation/ for installation information.${NC}"
    exit 1
fi
echo -e "${ORG}-- Now building SQL Container${NC}"
while : ; do
	printf "${ORG}-- Enter a root password for the database${NC}: "
	stty -echo
	read pass
	stty echo
	printf '\n'
	printf "${ORG}-- Please enter your password again${NC}: "
        stty -echo
        read passcheck
        stty echo
	printf '\n'
        if [[ $pass == $passcheck ]]
        	then
			break
	fi
	echo -e "${RED}-- Passwords did not match${NC}"
	printf '\n'
done
/usr/bin/docker run --name sql-server -e MYSQL_ROOT_PASSWORD=${pass} -d mysql/mysql-server:latest
printf "${ORG}-- SQL Database created and running!${NC}"
printf '\n'
printf "${CYN}-- Now building Web server${NC}"
printf '\n'
/usr/bin/docker build -t php-server .
printf "${CYN}-- Web server created!${NC}"
printf '\n'
printf "${CYN}-- Running Web server${NC}"
sudo docker run -d -v $PWD/dist/:/app -p 80:80 php-server 
printf "${CYN}-- Web server is running!${NC}"
printf '\n'
printf "${GRY}-- Importing database${NC}"
printf '\n'
/usr/bin/docker exec -i $(/usr/bin/docker ps -aqf "name=sql-server") mysql -uroot -p${pass} < init.sql 
printf "${GRY}-- Database imported!${NC}"
printf '\n'
echo -e "${GRN}Setup Complete! All containers running${NC}"
printf '\n'
