import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePreenchimentosTable1700000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "preenchimentos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "fieldId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "value",
                        type: "text",
                        charset: "utf8mb4",
                        isNullable: false,
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
        );

        const hasCamposTable = await queryRunner.hasTable("campos");
        if (hasCamposTable) {
            await queryRunner.createForeignKey(
                "preenchimentos",
                new TableForeignKey({
                    name: "FK_preenchimentos_campos",
                    columnNames: ["fieldId"],
                    referencedTableName: "campos",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                })
            );
        }

        await queryRunner.query(`CREATE INDEX IDX_PREENCHIMENTO_FIELDID ON preenchimentos(fieldId)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("preenchimentos", "FK_preenchimentos_campos");
        await queryRunner.dropTable("preenchimentos");
    }
}