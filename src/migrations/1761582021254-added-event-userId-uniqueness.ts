import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEventUserIdUniqueness1761582021254
  implements MigrationInterface
{
  name = "AddedEventUserIdUniqueness1761582021254";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "UQ_EVENT_USER" UNIQUE ("event_id", "user_id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "UQ_EVENT_USER"`
    );
  }
}
