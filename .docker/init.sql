CREATE DATABASE GiskardCalendarExercise;
Use GiskardCalendarExercise;
create table availabilities
(
    id    int auto_increment
        primary key,
    start datetime null,
    end   datetime null
);

INSERT INTO GiskardCalendarExercise.availabilities (id, start, end) VALUES (16, '2022-09-09 08:00:00', '2022-09-09 14:00:00');
INSERT INTO GiskardCalendarExercise.availabilities (id, start, end) VALUES (17, '2022-09-09 15:00:00', '2022-09-09 17:45:00');
INSERT INTO GiskardCalendarExercise.availabilities (id, start, end) VALUES (18, '2022-09-11 08:00:00', '2022-09-11 08:00:00');

create table reservations
(
    id    int auto_increment
        primary key,
    start datetime     null,
    end   datetime     null,
    title varchar(255) null,
    email varchar(100) null
);

INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (8, '2022-09-09 09:00:00', '2022-09-09 12:00:00', 'Essai 1 ', 'victorbillaud@gmail.com');
INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (9, '2022-09-10 13:30:00', '2022-09-10 16:00:00', 'Essai', 'victorbillaud@gmail.com');
INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (23, '2022-09-11 15:00:00', '2022-09-11 17:00:00', 'test', 'test');
INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (25, '2022-09-09 08:00:00', '2022-09-09 09:00:00', 'test', 'test');
INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (26, '2022-09-10 12:00:00', '2022-09-10 13:00:00', 'test', 'tets');
INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (27, '2022-09-10 16:15:00', '2022-09-10 16:45:00', 'Essai', 'victorbillaud@gmail.com');
INSERT INTO GiskardCalendarExercise.reservations (id, start, end, title, email) VALUES (28, '2022-09-09 17:45:00', '2022-09-09 22:00:00', 'Essai', 'victorbillaud@gmail.com');
