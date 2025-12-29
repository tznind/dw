# DW
This is a [Dungeon World](https://www.dungeon-world.com/) implementation of [LC Character Sheets](https://github.com/tznind/lc?tab=readme-ov-file#live-character-sheet).

It is online at https://tznind.github.io/dw/cs.html

Example Characters

<table>
  <tr>
    <td width="25%">
🪓&nbsp;<a title="Conan - The Barbarian" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=1&wisdom-value=0&charisma-value=0&role=Barbarian&name=Conan+the+Librarian&player=Thomas&strength_strmod=%2B2&constitution_conmod=%2B1&constitution_con=15&strength_str=16&charisma_chamod=-1&wisdom_wis=12&wisdom_wismod=-&dexterity_dex=9&intelligence_intmod=%2B1&dexterity_dexmod=-&intelligence_int=13&charisma_cha=8&damage=D10%2B1&hp=23&armor=1&xp=4&level=2&coin=590&load=6%2F10&bonds_cnt=3&bonds_0_bond=Giles+is+puny+and+foolish%2C+but+amusing+to+me.&bonds_1_bond=Dex%27s+ways+are+strange+and+confusing.&bonds_2_bond=Paula+the+Paladin+shares+my+hunger+for+glory%3B+the+earth+will+tremble+at+our+passing%21&equipment_cnt=5&equipment_0_item=Dungeon+Rations+%285+uses%29&equipment_0_weight=1&equipment_1_item=Dagger+%28hand%29&equipment_1_weight=1&equipment_2_item=Some+Token+of+where+you%27ve+travelled+or+where+you%27re+from&equipment_2_weight=0&equipment_3_item=Two-handed+Sword+%28close%2C+%2B1+damage%29&equipment_3_weight=2&equipment_4_item=Adventuring+Gear+%285+uses%29+and+Dungeon+Rations+%285+uses%2C+ration%29&equipment_4_weight=2&move_ba_pickone=1&move_br_dtl=Human&move_b1_pickone=2&move_b4_p3=1&move_b4_p5=1&move_b9=1&hide_untaken=1&look=Musclebound+superman+ready+to+SHHH+any+talkers+permenantly">Conan&nbsp;the&nbsp;Librarian</a>
    </td>
    <td width="25%">
      🤡&nbsp;<a title="Wynn - The Bard" href="https://tznind.github.io/dw/cs.html?strength-value=0&dexterity-value=0&constitution-value=0&intelligence-value=0&wisdom-value=0&charisma-value=0&role=Bard&name=Wynn+Swifthand&player=T&look=Jester%2C+stubble%2C+wrinkles+and+tattoos.&level=4&xp=12&charisma_chamod=%2B3&charisma_cha=18&dexterity_dex=16&dexterity_dexmod=%2B2&bonds_cnt=4&bonds_0_bond=This+is+not+my+first+adventure+with+Conan&bonds_1_bond=I+sang+stories+of+Rinsewynd+long+before+I+ever+met+them+in+person.&bonds_2_bond=Lucy+Luckless+trusted+me+with+a+secret&bonds_3_bond=Paula+the+Paladin+does+not+trust+me%2C+and+for+good+reason&intelligence_int=13&strength_str=8&strength_strmod=-1&constitution_con=9&hp=15&constitution_conmod=-&intelligence_intmod=%2B1&wisdom_wis=10&wisdom_wismod=-&move_aa_pickone=3&move_ar_pickone=2&move_a3_pickone=6&move_a6=1&move_a12=1&move_a13=1&takeFrom_a13_role=Paladin&takeFrom_a13_move=p9&equipment_cnt=5&equipment_0_item=Dungeon+Rations+%285+uses%29&equipment_0_weight=1&equipment_1_item=A+Fiddle%2C+never+before+played&equipment_1_weight=0&equipment_2_item=Ostentatious+Clothes+%28worn%29&equipment_2_weight=0&equipment_3_item=Dueling+Rapier+%28close%2C+precise%29&equipment_3_weight=2&equipment_4_item=Halfling+Pipeleaf+%286+uses%29&equipment_4_weight=0&armor=0&damage=d6&load=3%2F8&track_bm4=2&move_sm13_dtl=Preparing+for+winter&track_sm13=2">Wynn&nbsp;Swifthand</a>
    </td>
    <td width="25%">
    </td>
    <td width="25%">
    </td>
  </tr>
  <!--
  <tr>
    <td width="25%">
    </td>
    <td width="25%">
    </td>
    <td width="25%">
    </td>   
    <td width="25%">
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
