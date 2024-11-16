Predaja 15.11.2024.

Frontend, backend i baza deployani na render. Frontend funkcionalan ali nije povezan sa backendom, dok su backend i baza povezani te je moguće dohvaćati podatke pomoću api poziva na backendu. Nismo uspjeli povezati frontend sa backendom.

2024/11/15 20:25:25 [error] 39#39: *4 no live upstreams while connecting to upstream, client: 127.0.0.1, server: , request: "GET /api/people/getAuthUser HTTP/1.1", upstream: "https://reci-pa-ispeci-q8z2.onrender.com/api/people/getAuthUser", host: "reci-pa-ispeci-1.onrender.com", referrer: "https://reci-pa-ispeci-1.onrender.com/"

Error koji dobijamo većinu vremena. Vjerojatno nismo dobro uspjeli namjestiti proxy pomoću nginx i docker fileova. 

