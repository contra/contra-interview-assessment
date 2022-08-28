create table Common."FeatureFlag"
(
    id uuid default uuid_generate_v4() not null
        constraint "FeatureFlag_PKEY"
            primary key,
    name varchar(255),
    description text,
    "createdDate" timestamp with time zone default now() not null,
    "updatedDate" timestamp with time zone default now() not null
);

create table Common."User"
(
    id uuid default uuid_generate_v4() not null
        constraint "User_pkey"
            primary key,
    name varchar(255),
    email varchar(255),
    "createdDate" timestamp with time zone default now() not null,
    "updatedDate" timestamp with time zone default now() not null
);

create table Common."UserFeatureFlag"
(
    "userId" uuid unique
        constraint "UserFeatureFlag_userId_fkey"
            references common."User"
            on update cascade on delete set null,


    "featureFlagId" uuid
        constraint "UserFeatureFlag_featureFlag_fkey"
            references common."FeatureFlag"
            on update cascade on delete set null,
    "createdDate" timestamp with time zone default now() not null,
    "updatedDate" timestamp with time zone default now() not null
);