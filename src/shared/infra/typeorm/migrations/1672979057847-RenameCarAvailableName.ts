import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RenameCarAvailableName1672979057847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "available",
        type: "boolean",
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("cars", "available");
  }
}
