/*
 * @Author: [hsp]
 * @Date: 2020-07-20 11:47:38
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-20 16:22:33
 * @Description: 
 */
function setTemp(options) {
    let obj = {
        view: "",
        components: "",
        components_name: ""
    }
    if (options.length > 0 && typeof options === 'object') {
        let copy_obj = {}
        options.map(item => {
            obj.view += '<' + item.name.replace('_', '') + ' />';
            if (copy_obj[item.name] === undefined) {
                copy_obj[item.name] = item.name
                obj.components += 'import ' + item.name.replace('_', '') + ' from ' + '"@/components/' + item.name + '/' + item.name + '.vue";'
                obj.components_name += item.name.replace('_', '') + ',';
            }
        });
    }
    return obj;
}
module.exports = setTemp;