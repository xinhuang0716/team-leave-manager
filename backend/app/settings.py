import os
from pathlib import Path

from dotenv import dotenv_values
from pydantic import BaseModel, ConfigDict, Field, SecretStr

ENV_FILE = Path(__file__).resolve().parent.parent / "config" / ".env"
SETTING_NAMES = ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID", "D1_ID"]


class Settings(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    cloudflare_api_token: SecretStr = Field(min_length=1, alias=SETTING_NAMES[0], description="The Cloudflare API token")
    cloudflare_account_id: str = Field(min_length=1, alias=SETTING_NAMES[1], description="The Cloudflare account ID")
    d1_id: str = Field(min_length=1, alias=SETTING_NAMES[2], description="The ID of the Cloudflare D1 database")


def load_settings(env_file: Path = ENV_FILE) -> Settings:
    if env_file.is_file():
        values = dotenv_values(env_file)
    else:
        values = {name: os.environ.get(name) for name in SETTING_NAMES}

    return Settings.model_validate(values)
