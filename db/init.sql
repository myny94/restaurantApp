create table restaurant(
    id uuid default gen_random_uuid() primary key,
    name text not null,
    address text not null
);

create table restaurant_table(
    id uuid default gen_random_uuid() primary key,
    restaurant_id uuid not null references restaurant(id) on delete cascade,
    capacity int not null,
    description text not null
);
