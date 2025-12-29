# DW
This is a [Dungeon World](https://www.dungeon-world.com/) implementation of [LC Character Sheets](https://github.com/tznind/lc?tab=readme-ov-file#live-character-sheet).

It is online at https://tznind.github.io/dw/cs.html

Example Characters

<table>
  <tr>
    <td width="33%">
🪓&nsbp;<a title="Conan - The Barbarian" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=1&wisdom-value=0&charisma-value=0&role=Barbarian&name=Conan+the+Librarian&player=Thomas&strength_strmod=%2B2&constitution_conmod=%2B1&constitution_con=15&strength_str=16&charisma_chamod=-1&wisdom_wis=12&wisdom_wismod=-&dexterity_dex=9&intelligence_intmod=%2B1&dexterity_dexmod=-&intelligence_int=13&charisma_cha=8&damage=D10%2B1&hp=23&armor=1&xp=4&level=2&coin=590&load=6%2F10&bonds_cnt=3&bonds_0_bond=Giles+is+puny+and+foolish%2C+but+amusing+to+me.&bonds_1_bond=Dex%27s+ways+are+strange+and+confusing.&bonds_2_bond=Paula+the+Paladin+shares+my+hunger+for+glory%3B+the+earth+will+tremble+at+our+passing%21&equipment_cnt=5&equipment_0_item=Dungeon+Rations+%285+uses%29&equipment_0_weight=1&equipment_1_item=Dagger+%28hand%29&equipment_1_weight=1&equipment_2_item=Some+Token+of+where+you%27ve+travelled+or+where+you%27re+from&equipment_2_weight=0&equipment_3_item=Two-handed+Sword+%28close%2C+%2B1+damage%29&equipment_3_weight=2&equipment_4_item=Adventuring+Gear+%285+uses%29+and+Dungeon+Rations+%285+uses%2C+ration%29&equipment_4_weight=2&move_ba_pickone=1&move_br_dtl=Human&move_b1_pickone=2&move_b4_p3=1&move_b4_p5=1&move_b9=1&hide_untaken=1&look=Musclebound+superman+ready+to+SHHH+any+talkers+permenantly">Conan&nbsp;the&nbsp;Librarian</a>
    </td>
    <td width="33%">
      🤡&nbsp;<a title="Wynn - The Bard" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=0&wisdom-value=0&charisma-value=0&role=Bard&name=Wynn+Swifthand&player=T&look=Jester%2C+stubble%2C+wrinkles+and+tattoos.&level=4&xp=12&charisma_chamod=%2B3&charisma_cha=18&dexterity_dex=16&dexterity_dexmod=%2B2&bonds_cnt=4&bonds_0_bond=This+is+not+my+first+adventure+with+Conan&bonds_1_bond=I+sang+stories+of+Rinsewynd+long+before+I+ever+met+them+in+person.&bonds_2_bond=Lucy+Luckless+trusted+me+with+a+secret&bonds_3_bond=Paula+the+Paladin+does+not+trust+me%2C+and+for+good+reason&intelligence_int=13&strength_str=8&strength_strmod=-1&constitution_con=9&hp=15&constitution_conmod=-&intelligence_intmod=%2B1&wisdom_wis=10&wisdom_wismod=-&move_aa_pickone=3&move_ar_pickone=2&move_a3_pickone=6&move_a6=1&move_a12=1&move_a13=1&takeFrom_a13_role=Paladin&takeFrom_a13_move=p9&equipment_cnt=5&equipment_0_item=Dungeon+Rations+%285+uses%29&equipment_0_weight=1&equipment_1_item=A+Fiddle%2C+never+before+played&equipment_1_weight=0&equipment_2_item=Ostentatious+Clothes+%28worn%29&equipment_2_weight=0&equipment_3_item=Dueling+Rapier+%28close%2C+precise%29&equipment_3_weight=2&equipment_4_item=Halfling+Pipeleaf+%286+uses%29&equipment_4_weight=0&armor=0&damage=d6&load=3%2F8&track_bm4=2&move_sm13_dtl=Preparing+for+winter&track_sm13=2">Wynn&nbsp;Swifthand</a>
    </td>
    <td width="33%">🙏&nbsp;<a title="Shadow Kidney - The Cleric" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=1&wisdom-value=0&charisma-value=0&role=Cleric&name=Shadow+Kidney&player=SH&look=Decked+out+in+exclusively+black+and+silver%2C+Kidney+fits+perfectly+into+the+shadows+and+night+clubs+of+Farrun+alike.&wisdom_wis=18&wisdom_wismod=%2B3&strength_str=13&dexterity_dex=13&constitution_con=15&constitution_conmod=%2B2&strength_strmod=%2B1&dexterity_dexmod=%2B1&intelligence_int=10&intelligence_intmod=-&charisma_chamod=-1&charisma_cha=8&level=5&xp=6&damage=d6&hp=23&armor=0&bonds_cnt=4&bonds_0_bond=Durge+has+insulted+my+deity%3B+I+do+not+trust+them.&bonds_1_bond=Starone+is+a+good+and+faithful+person%3B+I+trust+them+implicitly.&bonds_2_bond=Storm+is+in+constant+danger%2C+I+will+keep+them+safe.&bonds_3_bond=I+am+working+on+converting+Minty+to+my+faith.&equipment_cnt=6&equipment_0_item=Some+Symbol+of+the+Divine+%28describe%3A+Small+hexagonal+version+of+the+hellraiser+cube%29&equipment_0_weight=1&equipment_1_item=Dungeon+Rations+%285+uses%2C+ration%29&equipment_1_weight=1&equipment_2_item=Chainmail+%281+armor%2C+worn%29&equipment_2_weight=1&equipment_3_item=Shield+%28%2B1+armor%29&equipment_3_weight=2&equipment_4_item=Mace+%28close%29&equipment_4_weight=1&equipment_5_item=Healing+Potion&equipment_5_weight=1&load=7%2F11&move_cr_pickone=3&move_cr_dtl=Half+elf%2C+whenever+**drama**+unfolds+gain+%2B1+forward+to+social+roles.&move_ca_pickone=3&move_c1_pickone=4&move_c1_dtl=Far%2C+the+god+of+things+hidden+far+off+in+shadows.&move_c1b_pickone=1&track_c2=1&move_c8=1&move_c10=1&move_c13=1&move_a13=1&takeFrom_a13_role=Fighter&takeFrom_a13_move=f1&weapon-base=Spear&weapon-range=Reach&enhancement-weighted=1&enhancement-sharp=1&weapon-look=Unblemished&move_f1_dtl=Far%27s+Spear+of+the+Night+is+super+sharp+and+all+it+cost+was+**sshh**&track_cs1=1&track_cs2=1&track_cs3=1&track_cs4=1&track_cs14=1&move_cs14=1&move_c6=1&move_c6_dtl=Darkness&move_cs4=1&move_cs12=1&track_cs12=1&hide_untaken=1&move_sm13_dtl=Seduce+Tav&track_sm13=3">Shadow&nbsp;Kidney</a>
    </td>
  </tr>
  <tr>
    <td width="33%">
      🐻&nbsp;<a title="Hasbin - The Druid" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=0&wisdom-value=0&charisma-value=0&role=Druid&name=Hasbin&player=Trudy&look=Hasbin+was+once+a+powerful+druid+and+still+bears+the+garb%2C+he+is+ripped+but+it+is+all+for+show+-+he+lacks+real+strength+-+except+as+a+bear.&strength_str=10&dexterity_dex=14&constitution_con=14&intelligence_int=8&wisdom_wis=18&charisma_cha=12&charisma_chamod=%2B1&wisdom_wismod=%2B3&intelligence_intmod=-1&constitution_conmod=%2B2&dexterity_dexmod=%2B2&strength_strmod=-&level=8&xp=4&damage=d6&hp=19%2F20&bonds_cnt=3&bonds_0_bond=Shadow+Kidney+smells+more+like+prey+than+a+hunter.&bonds_1_bond=I+have+showed+Tav+a+secret+rite+of+the+land.&bonds_2_bond=Starone+has+tasted+my+blood+and+I+theirs.+We+are+bound+by+it.&equipment_cnt=5&equipment_0_item=Some+Token+of+your+land+%28describe%3A+Tiny+shrubbery%29&equipment_0_weight=0&equipment_1_item=Hide+Armor+%281+armor%2C+worn%29&equipment_1_weight=1&equipment_2_item=Wooden+Shield+%28%2B1+armor%29&equipment_2_weight=1&equipment_3_item=Shillelagh+%28close%29&equipment_3_weight=2&equipment_4_item=Poultices+%26+Herbs+%282+uses%2C+slow%29&equipment_4_weight=1&load=5%2F6&armor=2&move_dr_pickone=1&move_d1_p1=1&move_d1_p4=1&move_d1_dtl=Faint+smell+of+sap+and+deep+gutteral+voice+that+sounds+super+romantic&track_d4=2&move_d4_dtl=Bear%2C+Crushing+leap%2C+Adoreable&move_d7=1&move_d10=1&move_d15=1&move_d8=1&move_d22=1&move_d24=1&takeFrom_d24_role=Ranger&takeFrom_d24_move=r17&move_d5=1&takeFrom_d5_role=Ranger&takeFrom_d5_move=r7&move_da_pickone=2&track_bm4=3&move_sm13_dtl=Find+that+strange+missing+kid+in+the+shadow+marshes+-+he+needs+rescued+surely&track_sm13=2">Hasbin</a>
    </td>
    <td width="33%">
⚔️&nbsp;<a title="Connor - The Warrior" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=0&wisdom-value=0&charisma-value=0&role=Fighter&name=Connor&player=M&look=Calm+scottish+accent%2C+ripped+muscles+on+smooth+frame&bonds_cnt=3&bonds_0_bond=Juan+Sanchez+owes+me+their+life%2C+wether+they+admit+it+or+not.&bonds_1_bond=I+have+sworn+to+protect+Heather&bonds_2_bond=I+worry+about+the+ability+of+Kurgan+to+survive+in+the+dungeon&equipment_cnt=5&equipment_0_item=Dungeon+Rations+%285+uses%2C+ration%29&equipment_0_weight=1&equipment_1_item=Chainmail+%281+armor%2C+worn%29&equipment_1_weight=1&equipment_2_item=Adventuring+Gear+%285+uses%29&equipment_2_weight=1&equipment_3_item=2+Healing+Potions&equipment_3_weight=2&equipment_4_item=22+coins&equipment_4_weight=0&move_fr_pickone=4&move_fa_pickone=2&weapon-base=Sword&weapon-range=Close&enhancement-glows=1&enhancement-crafted=1&weapon-look=Ancient&move_f1_dtl=There+can+be+only+one+sword%2C+this+is+it%21+it+glows+in+the+presence+of+immortals.%0AVersatile%3A+%2BReach&move_f6=1&enhancement-versatile=1&level=2&damage=d10&armor=1&xp=1&coin=22&strength_str=16&strength_strmod=%2B2&dexterity_dex=12&dexterity_dexmod=-&constitution_con=15&constitution_conmod=%2B1&intelligence_int=12&intelligence_intmod=-&wisdom_wis=8&wisdom_wismod=-1&charisma_cha=9&charisma_chamod=-&load=5%2F14&hide_untaken=1#move-f6">Connor</a>      
    </td>
    <td width="33%">
      🔥&nsbp;
      <a title="Melisandrama - The Immolator" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=0&wisdom-value=0&charisma-value=0&role=Immolator&name=Melisandrama&look=Beautiful+flowing+red+dresses%2C+piercing+eyes%2C+red+ruby+medallion.&intelligence_int=16&constitution_con=16&constitution_conmod=%2B2&intelligence_intmod=%2B2&level=2&wisdom_wis=13&wisdom_wismod=%2B1&strength_str=8&strength_strmod=-1&dexterity_dex=9&dexterity_dexmod=-&charisma_cha=12&charisma_chamod=-&move_ir_pickone=3&move_ir_dtl=Disguised+elder+hag+witch%2C+treat+as+human+racial.&bonds_cnt=3&bonds_0_bond=Jendry+has+felt+the+hellish+touch+of+fire%2C+now+they+know+my+strength.&bonds_1_bond=I+will+teach+Stannis+the+true+meaning+of+sacrifice.&bonds_2_bond=I+cast+something+into+the+fire+for+Rob+and+still+owe+them+their+due.&equipment_cnt=5&equipment_0_item=A+Symbol+of+your+sacrifices+past+%28Ruby+red+necklace%29&equipment_0_weight=0&equipment_1_item=Adventuring+Gear+%285+uses%29&equipment_1_weight=1&equipment_2_item=Healing+Potion&equipment_2_weight=1&equipment_3_item=Healing+Potion&equipment_3_weight=1&equipment_4_item=10+coins&equipment_4_weight=0&track_i1=3&move_i6=1&armor=0&xp=1&coin=10">Melisandrama</a>
    </td>   
  </tr>-->
</table>

## Live Character Sheet

Players can create their own characters, choose skills etc. Data is saved only into the address bar (URL) - allowing sharing/saving for later e.g. as a bookmark.

For upstream template repository, see https://github.com/tznind/lc

### Url Length 
There is a maximum url Length of ~8000 characters.  This is enforced by GitHub Pages. In practice, you should not reach this unless you have a large number of free text inputs into which your players add a lot of text. 

See [LIMITATIONS.md](./LIMITATIONS.md) for details.

## Powered by the Apocalypse

You can read more about Powered by the Apocalypse, including their permissive license terms, here:

https://lumpley.games/2023/11/22/what-is-pbta/
The system will automatically load the moves file and make the role available.


## Sync changes

If after using the template, if find new features have been added that you want to sync into your repository run the following to sync changes:

```
git remote add upstream https://github.com/tznind/lc
git fetch upstream

git checkout main
git merge upstream/main --allow-unrelated-histories
```

(for merge conflicts e.g. in data folder - always keep your own changes and discard incoming)

## Testing Locally

To run the page locally (i.e. not in GitHub Pages) you can use any of:

```powershell
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP  
php -S localhost:8000
```

Then visit `http://localhost:8000/cs.html`
