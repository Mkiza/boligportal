
CREATE EXTENSION IF NOT EXISTS "postgis";

ALTER TABLE properties
  ADD COLUMN location geography(Point, 4326)
  GENERATED ALWAYS AS (
    CASE 
      WHEN latitude IS NOT NULL AND longitude IS NOT NULL 
      THEN ST_SetSRID(ST_MakePoint(longitude::double precision, latitude::double precision), 4326)::geography
      ELSE NULL
    END
  ) STORED;

CREATE INDEX idx_properties_location ON properties USING GIST (location);

ALTER TABLE properties
  ADD CONSTRAINT chk_properties_coords
  CHECK (
    (latitude IS NULL AND longitude IS NULL) OR
    (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
  );
