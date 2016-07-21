RED='\033[0;31m'
GRN='\033[0;32m'
ORG='\033[0;33m'
CYN='\033[0;36m'
GRY='\033[0;37m'
NC='\033[0m' # No Color

FILE="/tmp/out.$$"
GREP="/bin/grep"

if [ "$1" == "-h" ]; then
	echo -e "${GRN} Usage:\n Run script as root to build Docker containers for the Swagger server. \n Arguments:\n \t -k : Kill running containers and rebuild them. \n \t -b : Backup the database \n \t -i : Restore database from backup\n${NC}"
	exit 1
fi 

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

if [ "$1" == "-k" ]; then
   echo -e "${GRN}-- (-k) Rebuilding containers${NC}"
   /usr/bin/docker stop $(/usr/bin/docker ps -a -q)
   /usr/bin/docker rm $(/usr/bin/docker ps -a -q)
fi

if [ "$1" == "-b" ]; then
   echo -e "${ORG}-- Now backing up SQL Container${NC}"
   printf "${ORG}-- Enter the root password for the database${NC}: "
   stty -echo
   read pass
   stty echo
   /usr/bin/docker exec -i $(/usr/bin/docker ps -aqf "name=sql-server") mysqldump -p${pass} --databases api > $PWD/db_backup/dump.sql
   printf "${ORG}\n-- If successful, the dump is in the db_backup/ directory\n${NC}: "
   exit 1
fi

if [ "$1" == "-i" ]; then
   echo -e "${ORG}-- Now restoring database backup to SQL Container${NC}"
   echo -e "${RED}-- Warning! Database data not backed up will be lost!${NC}"
   echo -e "${GRN}-- Continue? [Y/n]${NC}\t"
   read choice 
   if ! [[ $choice == "Y" ]] && ! [[ $choice == "y" ]]
	then
   		echo -e "${GRN}-- Aborting!${NC}"
		exit 1
   fi
   printf "${ORG}-- Enter the root password for the database${NC}: "
   stty -echo
   read pass
   stty echo
   /usr/bin/docker exec -i $(/usr/bin/docker ps -aqf "name=sql-server") mysql -uroot -p${pass} < $PWD/db_backup/dump.sql
   printf "${ORG}\n-- Process Complete\n${NC}"
   exit 1
fi

SQL_RUN=$(sudo docker ps -aqf "name=sql-server")
WEB_RUN=$(sudo docker ps -aqf "name=web-server")

if ! [ -z "$SQL_RUN" ] || ! [ -z "$WEB_RUN" ] ; then
    echo -e "${RED}Services are already running, or have terminated unexpectedly.\nRun the script again with the -k argument to re-initialize them ${NC}"
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
/bin/cp template.php template.php.tmp
IP=$(/usr/bin/docker inspect $(/usr/bin/docker ps -aqf "name=sql-server") | grep IPAddress | tail -1 |  sed -e 's/^[ \t]*//' | cut -c 15- | sed 's/\,//g' | sed 's/\"//g')
echo '$DB_SERVER = "'$IP'"; $DB_PASS = "'$pass'";?>' >> template.php
/bin/cp template.php dist/api/secrets.php
/bin/rm template.php
/bin/mv template.php.tmp template.php
/usr/bin/docker build -t php-server .
/bin/mkdir -p $PWD/dist/api/uploads/
/bin/mkdir -p $PWD/db_backup
/bin/chmod 777 $PWD/dist/api/uploads/
printf "${CYN}-- Web server created!${NC}"
printf '\n'
printf "${CYN}-- Running Web server${NC}"
printf '\n'
/usr/bin/docker run --name web-server -d -v $PWD/dist/:/app -p 80:80 php-server 
printf "${CYN}-- Web server is running!${NC}"
printf '\n'
printf "${GRY}-- Importing database${NC}"
printf '\n'
/usr/bin/docker exec -i $(/usr/bin/docker ps -aqf "name=sql-server") mysql -uroot -p${pass} < init.sql 
printf "${GRY}-- Database imported!${NC}"
printf '\n'
echo -e "${GRN}Setup Complete! All containers running${NC}"
printf '\n'
