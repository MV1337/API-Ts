import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterCarAvailableName1672978622491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cars", "avalable")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("cars", 
            new TableColumn({
                name: "avalable",
                type: "boolean"
            })
        )
    }
}
