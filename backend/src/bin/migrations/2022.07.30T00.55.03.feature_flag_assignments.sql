CREATE TABLE feature_flag_assignments (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  feature_flag_id integer NOT NULL,
  actor_id integer NOT NULL,
  actor_type text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

CREATE INDEX ff_actor_idx ON feature_flag_assignments(actor_id, actor_type);
CREATE INDEX ff_idx ON feature_flag_assignments(feature_flag_id);