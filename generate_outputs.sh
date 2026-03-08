#!/bin/bash
cd /Users/christianmarcosmp/Documents/GitHub/expressBookReviews/final_project
echo 'curl -s https://api.github.com/repos/AgentBooster/expressBookReviews | jq ".parent.full_name"' > githubrepo
curl -s https://api.github.com/repos/AgentBooster/expressBookReviews | jq '.parent.full_name' >> githubrepo

echo 'curl -s http://localhost:5005/' > getallbooks
echo "" >> getallbooks
curl -s http://localhost:5005/ >> getallbooks

echo 'curl -s http://localhost:5005/isbn/1' > getbooksbyISBN
echo "" >> getbooksbyISBN
curl -s http://localhost:5005/isbn/1 >> getbooksbyISBN

echo 'curl -s "http://localhost:5005/author/Chinua%20Achebe"' > getbooksbyauthor
echo "" >> getbooksbyauthor
curl -s "http://localhost:5005/author/Chinua%20Achebe" >> getbooksbyauthor

echo 'curl -s "http://localhost:5005/title/Fairy%20tales"' > getbooksbytitle
echo "" >> getbooksbytitle
curl -s "http://localhost:5005/title/Fairy%20tales" >> getbooksbytitle

echo 'curl -s http://localhost:5005/review/1' > getbookreview
echo "" >> getbookreview
curl -s http://localhost:5005/review/1 >> getbookreview

echo 'curl -s -X POST http://localhost:5005/register -H "Content-Type: application/json" -d "{\"username\":\"AgentBooster\",\"password\":\"password123\"}"' > register
echo "" >> register
curl -s -X POST http://localhost:5005/register -H "Content-Type: application/json" -d '{"username":"AgentBooster","password":"password123"}' >> register

echo 'curl -s -c cookies.txt -X POST http://localhost:5005/customer/login -H "Content-Type: application/json" -d "{\"username\":\"AgentBooster\",\"password\":\"password123\"}"' > login
echo "" >> login
curl -s -c cookies.txt -X POST http://localhost:5005/customer/login -H "Content-Type: application/json" -d '{"username":"AgentBooster","password":"password123"}' >> login

echo 'curl -s -b cookies.txt -X PUT "http://localhost:5005/customer/auth/review/1?review=GreatBook"' > reviewadded
echo "" >> reviewadded
curl -s -b cookies.txt -X PUT "http://localhost:5005/customer/auth/review/1?review=GreatBook" >> reviewadded

echo 'curl -s -b cookies.txt -X DELETE http://localhost:5005/customer/auth/review/1' > deletereview
echo "" >> deletereview
curl -s -b cookies.txt -X DELETE http://localhost:5005/customer/auth/review/1 >> deletereview
