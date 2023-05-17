create database db_projeto_alphacode;

use db_projeto_alphacode;

create table tbl_contact (
	id int not null auto_increment primary key,
    name varchar(80) not null,
    email varchar(255) not null,
    phone varchar(15),
    birth_date date not null,
    work varchar(300),
    cell_phone varchar(20) not null,
    enabled_wpp tinyint(1) not null,
    enabled_sms tinyint(1) not null,
    enabled_email tinyint(1) not null
);

desc tbl_contact;

insert into tbl_contact (
	name,
    email,
    phone,
    birth_date,
    work,
    cell_phone,
    enabled_wpp,
    enabled_sms,
    enabled_email
) values (
	'Eduardo Moreira',
    'eduardo@email.com',
    '(11) 3695-4199',
    '2004-07-27',
    'Desenvolvedor de sistemas',
    '(11) 96332-2910',
    1,
    1,
    1
);
