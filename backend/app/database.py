from cloudflare import AsyncCloudflare


class D1:
    def __init__(self, client: AsyncCloudflare, cloudflare_account_id: str, d1_id: str):
        self.client = client
        self.cloudflare_account_id = cloudflare_account_id
        self.d1_id = d1_id

    async def query(self, sql: str, params: list[str] | None = None):
        """Execute a SQL query against the D1 database."""
        page = await self.client.d1.database.query(
            account_id=self.cloudflare_account_id,
            database_id=self.d1_id,
            sql=sql,
            params=params or [],
        )

        if not page.result:
            raise RuntimeError("D1 returned no query result")

        # Return first SQL command result
        result = page.result[0]
        if result.success is False:
            raise RuntimeError("D1 query failed")

        return result
