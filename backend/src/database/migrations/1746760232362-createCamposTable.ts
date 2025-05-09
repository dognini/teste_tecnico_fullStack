import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCamposTable1746760232362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "campos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "300",
                        isNullable: false,
                        charset: "utf8mb4",
                    },
                    {
                        name: "datatype",
                        type: "enum",
                        enum: ["string", "number", "boolean", "date"],
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ],
                engine: "InnoDB",
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("campos");
    }

}