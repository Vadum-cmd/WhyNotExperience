class AddUuidDefaultToTables < ActiveRecord::Migration[8.0]
  def up
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    execute <<-SQL
      ALTER TABLE boats       ALTER COLUMN id SET DEFAULT gen_random_uuid();
      ALTER TABLE experiences ALTER COLUMN id SET DEFAULT gen_random_uuid();
      ALTER TABLE bookings   ALTER COLUMN id SET DEFAULT gen_random_uuid();
      ALTER TABLE reviews    ALTER COLUMN id SET DEFAULT gen_random_uuid();
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE boats       ALTER COLUMN id DROP DEFAULT;
      ALTER TABLE experiences ALTER COLUMN id DROP DEFAULT;
      ALTER TABLE bookings   ALTER COLUMN id DROP DEFAULT;
      ALTER TABLE reviews    ALTER COLUMN id DROP DEFAULT;
    SQL
  end
end
