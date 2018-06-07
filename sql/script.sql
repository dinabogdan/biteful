insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Berceni', 26.09671, 44.404864, 'http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9kfemMjDt_B3ZefHPKijjkezh1gv71cyrJyWjpRdprA_iRWa', NOW(), NOW());
insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Obor', 26.124029, 44.449927, 'http://www.restograf.ro/wp-content/uploads/2010/12/Restaurant-pizzerie-Horoscop-la-Piata-Unirii-in-Bucuresti.jpg', NOW(), NOW());
insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Victoriei', 26.085824, 44.452101, 'http://www.restograf.ro/wp-content/uploads/2010/12/Buongiorno-Trattoria-2.jpg',NOW(), NOW());
insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Unirii', 26.102538, 44.426767, 'http://mancarebuna.files.wordpress.com/2012/07/phd-pizza-cluj.jpg', NOW(), NOW());

insert into deliveries(createdAt, updatedAt, addressId, customerId, courierId, storeId) values (NOW(), NOW(), 1, 1, 2, 1);
insert into addresses (details, createdAt, updatedAt) values ('some details', NOW(), NOW());
insert into stores(name, logoUrl, pdfUrl, createdAt, updatedAt) values ('Store02', 'http://www.google.com', 'http://www.google.com', NOW(), NOW());
insert into users (username,email, password, type, createdAt, updatedAt) values ('Dina', 'bogdan.dina03@gmail.com', 'passwd', 'CLIENT_NORMAL', NOW(), NOW());
insert into users (username,email, password, type, createdAt, updatedAt) values ('Bogdan', 'bogdan.dina@gmail.com', 'passwd', 'COURIER', NOW(), NOW());
