export function getStatValue(item: any, stat: string) {
    if(item.items){
      const itemStat = item.stats?.[stat] || 0;
      const armorStat = item.items.armor?.atributes?.[stat] || 0;
      const avatarStat = item.items.avatar?.atributes?.[stat] || 0;
      const shipStat = item.items.ship?.atributes?.[stat] || 0;
      const specialStat = item.items.special?.atributes?.[stat] || 0;
      const weaponStat = item.items.weapon?.atributes?.[stat] || 0;
    
      return itemStat + armorStat + avatarStat + shipStat + specialStat + weaponStat;
    }else{
      return 0
    }

  }