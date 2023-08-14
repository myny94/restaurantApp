create table restaurant(
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null,
    address text not null
);

create table reservation(
    id uuid default gen_random_uuid() primary key,
    restaurant_id uuid not null references restaurant(id) on delete cascade,
    reservation_from timestamptz not null,
    reservation_to timestamptz not null,
    number_of_persons int not null check (number_of_persons > 0)
);

create table restaurant_table(
    id uuid default gen_random_uuid() primary key,
    restaurant_id uuid not null references restaurant(id) on delete cascade,
    capacity int not null check (capacity > 0),
    description text not null
);

create table reservation_table_association(
    reservation_id uuid references reservation(id) on delete cascade,
    table_id uuid references restaurant_table(id) on delete cascade
);

insert into restaurant (id, name, description, address) values ('7448ef79-90cd-499a-97fb-47b903c3e3dd', 'Nayeongs Bibimbab','bibimbap restaurant', 'Askistontie');