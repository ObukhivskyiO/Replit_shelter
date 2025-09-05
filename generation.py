import json
import random

def generate_character(pack_id):
    """Генерує персонажа з вибраного пакету"""
    with open(f'static/json/pack/{pack_id}.json', 'r', encoding='utf-8') as f:
        pack_data = json.load(f)
    
    character = {
        "pack_id": pack_id,
        "attributes": {}
    }
    
    for category in pack_data["categories"]:
        selected_item = random.choice(category["items"])
        character["attributes"][category["id"]] = {
            "category_name": category["name"],
            "value": selected_item["value"],
            "description": selected_item["description"],
            "effect": selected_item["effect"]
        }
    
    return character

gen_char = generate_character("mediaevalism")

print(gen_char['attributes']['gender'])
print(gen_char['attributes']['human_trait'])