insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Berceni', 26.09671, 44.404864, 'http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9kfemMjDt_B3ZefHPKijjkezh1gv71cyrJyWjpRdprA_iRWa', NOW(), NOW());
insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Obor', 26.124029, 44.449927, 'http://www.restograf.ro/wp-content/uploads/2010/12/Restaurant-pizzerie-Horoscop-la-Piata-Unirii-in-Bucuresti.jpg', NOW(), NOW());
insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Victoriei', 26.085824, 44.452101, 'http://www.restograf.ro/wp-content/uploads/2010/12/Buongiorno-Trattoria-2.jpg',NOW(), NOW());
insert into locations(name, longitude, latitude, imageUrl, createdAt, updatedAt) values ('Unirii', 26.102538, 44.426767, 'http://mancarebuna.files.wordpress.com/2012/07/phd-pizza-cluj.jpg', NOW(), NOW());
insert into deliveries(createdAt, updatedAt, addressId, customerId, courierId, storeId) values (NOW(), NOW(), 1, 1, 2, 1);
insert into addresses (details, createdAt, updatedAt) values ('some details', NOW(), NOW());
insert into stores(name, logoUrl, pdfUrl, createdAt, updatedAt) values ('Store02', 'http://www.google.com', 'http://www.google.com', NOW(), NOW());
insert into users (username,email, password, type, createdAt, updatedAt) values ('Dina', 'bogdan.dina03@gmail.com', 'passwd', 'CLIENT_NORMAL', NOW(), NOW());
insert into users (username,email, password, type, createdAt, updatedAt) values ('Bogdan', 'bogdan.dina@gmail.com', 'passwd', 'COURIER', NOW(), NOW());



SELECT `delivery`.`id`,
        `address`.`id` AS `address.id`,
        `address`.`details` AS `address.details`,
        `Customer`.`id` AS `Customer.id`,
        `Customer`.`username` AS `Customer.username`,
        `Customer`.`type` AS `Customer.type`,
        `Courier`.`id` AS `Courier.id`,
        `Courier`.`username` AS `Courier.username`,
        `Courier`.`type` AS `Courier.type`,
        `store`.`id` AS `store.id`,
        `store`.`name` AS `store.name`,
        `store->location`.`id` AS `store.location.id`,
        `store->location`.`name` AS `store.location.name`,
        `store->location`.`longitude` AS `store.location.longitude`,
        `store->location`.`latitude` AS `store.location.latitude`, 
        `store->location`.`imageUrl` AS `store.location.imageUrl`
            FROM `deliveries` AS `delivery`
            INNER JOIN `addresses` AS `address`
            ON `delivery`.`addressId` = `address`.`id`
            INNER JOIN `users` AS `Customer`
            ON `delivery`.`id` = `Customer`.`deliveryId` AND `Customer`.`type` = 'CLIENT_NORMAL'
            INNER JOIN `users` AS `Courier` ON `delivery`.`id` = `Courier`.`deliveryId` AND `Courier`.`type` = 'COURIER'
            INNER JOIN `stores` AS `store`
            ON `delivery`.`storeId` = `store`.`id`
            INNER JOIN `locations` AS `store->location`
            ON `store`.`id` = `store->location`.`storeId`;
