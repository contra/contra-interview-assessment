CREATE TABLE flag_variant (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  flag_id integer NOT NULL,
  variant_name text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

ALTER TABLE flag_variant ADD CONSTRAINT flag_variant_flag 
FOREIGN KEY (flag_id) REFERENCES flag(id);
