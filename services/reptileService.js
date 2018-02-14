const mongoose = require('mongoose'),
    Reptile = mongoose.model('Reptile'),
    uuidv1 = require('uuid/v1'),
    superagent = require('superagent')

class Service {
    constructor() {}
    async findOne() {
        let obj
        let query = await Reptile.findOne((err, data) => {
            if (data) {
                obj = data
            } else {
                obj = null
            }
        })
        return obj
    }
	
    async find(limit) {
        let _data
        let query = Reptile.find({}).skip(0).limit(limit)
        await query.exec((err, data) => {
            _data = data
        }).then(() => {
            _data.forEach(item => {
                Reptile.remove({ id: item.id }, err => {})
            })
        })
        return _data
    }

    async findRandom() {
        let _data, count, index
		await Reptile.count({}, (err, c) => count = c)
        index = Math.floor(Math.random() * count)
        let query = Reptile.find({ index: String(index) })
        await query.exec((err, data) => {
            _data = data
        })
        return _data
    }
	
	async findBaseRandom() {
        let _data, count, index
		await Reptile.count({}, (err, c) => count = c||0)
        index = Math.floor(Math.random() * count)
        let query = Reptile.find({ index: String(index), status: '0' })
        await query.exec((err, data) => {
            _data = data
			if(_data && _data.length > 0) {
				Reptile.update({id: _data[0].id}, {$set:{status:'1'}},(err, res) => {})
			}
        })
        return _data
    }

    async findAll() {
        let _data
        let query = Reptile.find({})
        await query.exec((err, data) => {
            _data = data
        })
        return _data
    }

    async delete(ids) {
        ids.forEach(id => {
            Reptile.remove({ id: id }, err => {})
        })
    }

    async deleteById(id) {
        Reptile.remove({ id: id }, err => {})
    }


    async reptile(baseUrl) {
        var arr = [],
            lastArr = [],
			count
		await Reptile.count({}, (err, c) => count = c || 0)
        superagent.get(baseUrl).end(function(err, res) {
            if (!res) return
            let text = res.text || ''
            if (text.indexOf('X-Frame-Options') > -1) return
            arr = text.match(/((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig)
			
            if (!arr) return
            arr.forEach(function(item) {
                if (item.indexOf('://www') > -1 &&
                    item.indexOf('baidu') === -1 &&
                    item.indexOf('...') === -1 &&
                    item.indexOf('.jpg') === -1 &&
                    item.indexOf('.png') === -1 &&
                    item.indexOf('.pdf') === -1 &&
                    item.indexOf('.zip') === -1 &&
                    item.indexOf('.exe') === -1 &&
                    item.indexOf('.txt') === -1 &&
                    item.indexOf('.doc') === -1 &&
                    item.indexOf('.rm') === -1 &&
                    item.indexOf('.mp4') === -1 &&
                    item.indexOf('tuniu') === -1 &&
                    item.indexOf('.ico') === -1 &&
                    item.indexOf('.js') === -1 &&
                    item.indexOf('.mv') === -1 &&
					item.indexOf('.apk') === -1 &&
					item.indexOf('.php') === -1 &&
					item.indexOf('.php') === -1 &&
					item.indexOf('.php') === -1 &&
					item.indexOf('.php') === -1 &&
					item.indexOf('.php') === -1 &&
					item.indexOf('.php') === -1 &&
					item.indexOf('.php') === -1 &&
                    item.indexOf('.dtd') === -1 &&
                    item.indexOf('www.w3.org') === -1 &&
                    item.indexOf('.swf') === -1 &&
                    item.indexOf('gmw') === -1 &&
                    item.indexOf('china') === -1 &&
                    item.indexOf('gaotie') === -1 &&
                    item.indexOf('.gov') === -1 &&
                    item.indexOf('.svg') === -1 &&
                    item.indexOf('.xsl') === -1 &&
					item.indexOf('beijing') === -1 &&
					item.indexOf('chongqing') === -1 &&
					item.indexOf('shanghai') === -1 &&
					item.indexOf('tianjin') === -1 &&
					item.indexOf('changchun') === -1 &&
					item.indexOf('changsha') === -1 &&
					item.indexOf('changzhou') === -1 &&
					item.indexOf('chengdu') === -1 &&
					item.indexOf('dalian') === -1 &&
					item.indexOf('dongguan') === -1 &&
					item.indexOf('foshan') === -1 &&
					item.indexOf('fuzhou') === -1 &&
					item.indexOf('guangzhou') === -1 &&
					item.indexOf('guiyang') === -1 &&
					item.indexOf('haerbin') === -1 &&
					item.indexOf('haikou') === -1 &&
					item.indexOf('handan') === -1 &&
					item.indexOf('hangzhou') === -1 &&
					item.indexOf('hefei') === -1 &&
					item.indexOf('huizhou') === -1 &&
					item.indexOf('jiaozuo') === -1 &&
					item.indexOf('jiaxing') === -1 &&
					item.indexOf('jilin') === -1 &&
					item.indexOf('jinan') === -1 &&
					item.indexOf('kunming') === -1 &&
					item.indexOf('lanzhou') === -1 &&
					item.indexOf('liuzhou') === -1 &&
					item.indexOf('luoyang') === -1 &&
					item.indexOf('nanchang') === -1 &&
					item.indexOf('nanjing') === -1 &&
					item.indexOf('nanning') === -1 &&
					item.indexOf('nantong') === -1 &&
					item.indexOf('ningbo') === -1 &&
					item.indexOf('qingdao') === -1 &&
					item.indexOf('quanzhou') === -1 &&
					item.indexOf('shenyang') === -1 &&
					item.indexOf('shenzhen') === -1 &&
					item.indexOf('shijiazhuang') === -1 &&
					item.indexOf('suzhou') === -1 &&
					item.indexOf('taizhou') === -1 &&
					item.indexOf('tangshan') === -1 &&
					item.indexOf('weifang') === -1 &&
					item.indexOf('weihai') === -1 &&
					item.indexOf('wuhan') === -1 &&
					item.indexOf('wuxi') === -1 &&
					item.indexOf('xiamen') === -1 &&
					item.indexOf('xian') === -1 &&
					item.indexOf('xuchang') === -1 &&
					item.indexOf('xuzhou') === -1 &&
					item.indexOf('yangzhou') === -1 &&
					item.indexOf('yantai') === -1 &&
					item.indexOf('zhangzhou') === -1 &&
					item.indexOf('zhengzhou') === -1 &&
					item.indexOf('zhongshan') === -1 &&
					item.indexOf('zhuhai') === -1 &&
					item.indexOf('aba') === -1 &&
					item.indexOf('akesu') === -1 &&
					item.indexOf('alashanmeng') === -1 &&
					item.indexOf('aletai') === -1 &&
					item.indexOf('ali') === -1 &&
					item.indexOf('ankang') === -1 &&
					item.indexOf('anqing') === -1 &&
					item.indexOf('anshan') === -1 &&
					item.indexOf('anshun') === -1 &&
					item.indexOf('anyang') === -1 &&
					item.indexOf('baicheng') === -1 &&
					item.indexOf('baise') === -1 &&
					item.indexOf('baishan') === -1 &&
					item.indexOf('baiyin') === -1 &&
					item.indexOf('bangbu') === -1 &&
					item.indexOf('baoding') === -1 &&
					item.indexOf('baoji') === -1 &&
					item.indexOf('baoshan') === -1 &&
					item.indexOf('baotou') === -1 &&
					item.indexOf('bayannaoer') === -1 &&
					item.indexOf('bayinguoleng') === -1 &&
					item.indexOf('bazhong') === -1 &&
					item.indexOf('beihai') === -1 &&
					item.indexOf('benxi') === -1 &&
					item.indexOf('bijie') === -1 &&
					item.indexOf('binzhou') === -1 &&
					item.indexOf('boertala') === -1 &&
					item.indexOf('bozhou') === -1 &&
					item.indexOf('cangzhou') === -1 &&
					item.indexOf('changde') === -1 &&
					item.indexOf('changdu') === -1 &&
					item.indexOf('changji') === -1 &&
					item.indexOf('changzhi') === -1 &&
					item.indexOf('chaohu') === -1 &&
					item.indexOf('chaoyang') === -1 &&
					item.indexOf('chaozhou') === -1 &&
					item.indexOf('chengde') === -1 &&
					item.indexOf('chenzhou') === -1 &&
					item.indexOf('chifeng') === -1 &&
					item.indexOf('chizhou') === -1 &&
					item.indexOf('chongzuo') === -1 &&
					item.indexOf('chuxiong') === -1 &&
					item.indexOf('chuzhou') === -1 &&
					item.indexOf('dali') === -1 &&
					item.indexOf('dandong') === -1 &&
					item.indexOf('daqing') === -1 &&
					item.indexOf('datong') === -1 &&
					item.indexOf('daxinganling') === -1 &&
					item.indexOf('dazhou') === -1 &&
					item.indexOf('dehong') === -1 &&
					item.indexOf('deyang') === -1 &&
					item.indexOf('dezhou') === -1 &&
					item.indexOf('dingxi') === -1 &&
					item.indexOf('diqing') === -1 &&
					item.indexOf('dongying') === -1 &&
					item.indexOf('eerduosi') === -1 &&
					item.indexOf('enshi') === -1 &&
					item.indexOf('ezhou') === -1 &&
					item.indexOf('fangchenggang') === -1 &&
					item.indexOf('fushun') === -1 &&
					item.indexOf('fuxin') === -1 &&
					item.indexOf('fuyang') === -1 &&
					item.indexOf('fuzhou') === -1 &&
					item.indexOf('gannan') === -1 &&
					item.indexOf('ganzhou') === -1 &&
					item.indexOf('ganzi') === -1 &&
					item.indexOf('guangan') === -1 &&
					item.indexOf('guangyuan') === -1 &&
					item.indexOf('guigang') === -1 &&
					item.indexOf('guilin') === -1 &&
					item.indexOf('guoluo') === -1 &&
					item.indexOf('guyuan') === -1 &&
					item.indexOf('haibei') === -1 &&
					item.indexOf('haidong') === -1 &&
					item.indexOf('hainan') === -1 &&
					item.indexOf('haixi') === -1 &&
					item.indexOf('hami') === -1 &&
					item.indexOf('hanzhong') === -1 &&
					item.indexOf('hebi') === -1 &&
					item.indexOf('hechi') === -1 &&
					item.indexOf('hegang') === -1 &&
					item.indexOf('heihe') === -1 &&
					item.indexOf('hengshui') === -1 &&
					item.indexOf('hengyang') === -1 &&
					item.indexOf('hetiandi') === -1 &&
					item.indexOf('heyuan') === -1 &&
					item.indexOf('heze') === -1 &&
					item.indexOf('hezhou') === -1 &&
					item.indexOf('honghe') === -1 &&
					item.indexOf('huaian') === -1 &&
					item.indexOf('huaibei') === -1 &&
					item.indexOf('huaihua') === -1 &&
					item.indexOf('huainan') === -1 &&
					item.indexOf('huanggang') === -1 &&
					item.indexOf('huangnan') === -1 &&
					item.indexOf('huangshan') === -1 &&
					item.indexOf('huangshi') === -1 &&
					item.indexOf('huhehaote') === -1 &&
					item.indexOf('huludao') === -1 &&
					item.indexOf('hulunbeier') === -1 &&
					item.indexOf('huzhou') === -1 &&
					item.indexOf('jiamusi') === -1 &&
					item.indexOf('jiangmen') === -1 &&
					item.indexOf('jian') === -1 &&
					item.indexOf('jiayuguan') === -1 &&
					item.indexOf('jieyang') === -1 &&
					item.indexOf('jinchang') === -1 &&
					item.indexOf('jincheng') === -1 &&
					item.indexOf('jingdezhen') === -1 &&
					item.indexOf('jingmen') === -1 &&
					item.indexOf('jingzhou') === -1 &&
					item.indexOf('jinhua') === -1 &&
					item.indexOf('jining') === -1 &&
					item.indexOf('jinzhong') === -1 &&
					item.indexOf('jinzhou') === -1 &&
					item.indexOf('jiujiang') === -1 &&
					item.indexOf('jiuquan') === -1 &&
					item.indexOf('jixi') === -1 &&
					item.indexOf('kaifeng') === -1 &&
					item.indexOf('kashidi') === -1 &&
					item.indexOf('kelamayi') === -1 &&
					item.indexOf('kezile') === -1 &&
					item.indexOf('laibin') === -1 &&
					item.indexOf('laiwu') === -1 &&
					item.indexOf('langfang') === -1 &&
					item.indexOf('lasa') === -1 &&
					item.indexOf('leshan') === -1 &&
					item.indexOf('liangshan') === -1 &&
					item.indexOf('lianyungang') === -1 &&
					item.indexOf('liaocheng') === -1 &&
					item.indexOf('liaoyang') === -1 &&
					item.indexOf('liaoyuan') === -1 &&
					item.indexOf('lijiang') === -1 &&
					item.indexOf('lincang') === -1 &&
					item.indexOf('linfen') === -1 &&
					item.indexOf('linxia') === -1 &&
					item.indexOf('linyi') === -1 &&
					item.indexOf('linzhi') === -1 &&
					item.indexOf('lishui') === -1 &&
					item.indexOf('liuan') === -1 &&
					item.indexOf('liupanshui') === -1 &&
					item.indexOf('longnan') === -1 &&
					item.indexOf('longyan') === -1 &&
					item.indexOf('loudi') === -1 &&
					item.indexOf('luohe') === -1 &&
					item.indexOf('luzhou') === -1 &&
					item.indexOf('lvliang') === -1 &&
					item.indexOf('maanshan') === -1 &&
					item.indexOf('maoming') === -1 &&
					item.indexOf('meishan') === -1 &&
					item.indexOf('meizhou') === -1 &&
					item.indexOf('mianyang') === -1 &&
					item.indexOf('mudanjiang') === -1 &&
					item.indexOf('nanchong') === -1 &&
					item.indexOf('nanping') === -1 &&
					item.indexOf('nanyang') === -1 &&
					item.indexOf('naqu') === -1 &&
					item.indexOf('neijiang') === -1 &&
					item.indexOf('ningde') === -1 &&
					item.indexOf('nujiang') === -1 &&
					item.indexOf('panjin') === -1 &&
					item.indexOf('panzhihua') === -1 &&
					item.indexOf('pingdingshan') === -1 &&
					item.indexOf('pingliang') === -1 &&
					item.indexOf('pingxiang') === -1 &&
					item.indexOf('puer') === -1 &&
					item.indexOf('putian') === -1 &&
					item.indexOf('puyang') === -1 &&
					item.indexOf('qiandong') === -1 &&
					item.indexOf('qiannan') === -1 &&
					item.indexOf('qianxinan') === -1 &&
					item.indexOf('qingyang') === -1 &&
					item.indexOf('qingyuan') === -1 &&
					item.indexOf('qinhuangdao') === -1 &&
					item.indexOf('qinzhou') === -1 &&
					item.indexOf('qiqihaer') === -1 &&
					item.indexOf('qitaihe') === -1 &&
					item.indexOf('qujing') === -1 &&
					item.indexOf('quzhou') === -1 &&
					item.indexOf('rikaze') === -1 &&
					item.indexOf('rizhao') === -1 &&
					item.indexOf('sanmenxia') === -1 &&
					item.indexOf('sanming') === -1 &&
					item.indexOf('sanya') === -1 &&
					item.indexOf('shangluo') === -1 &&
					item.indexOf('shangqiu') === -1 &&
					item.indexOf('shangrao') === -1 &&
					item.indexOf('shannan') === -1 &&
					item.indexOf('shantou') === -1 &&
					item.indexOf('shanwei') === -1 &&
					item.indexOf('shaoguan') === -1 &&
					item.indexOf('shaoxing') === -1 &&
					item.indexOf('shaoyang') === -1 &&
					item.indexOf('shiyan') === -1 &&
					item.indexOf('shizuishan') === -1 &&
					item.indexOf('shuangyashan') === -1 &&
					item.indexOf('shuozhou') === -1 &&
					item.indexOf('siping') === -1 &&
					item.indexOf('songyuan') === -1 &&
					item.indexOf('suihua') === -1 &&
					item.indexOf('suining') === -1 &&
					item.indexOf('suizhou') === -1 &&
					item.indexOf('suqian') === -1 &&
					item.indexOf('suzhou') === -1 &&
					item.indexOf('tachengdi') === -1 &&
					item.indexOf('taian') === -1 &&
					item.indexOf('taiyuan') === -1 &&
					item.indexOf('taizhou') === -1 &&
					item.indexOf('tianshui') === -1 &&
					item.indexOf('tieling') === -1 &&
					item.indexOf('tongchuan') === -1 &&
					item.indexOf('tonghua') === -1 &&
					item.indexOf('tongliao') === -1 &&
					item.indexOf('tongling') === -1 &&
					item.indexOf('tongren') === -1 &&
					item.indexOf('tulufan') === -1 &&
					item.indexOf('weinan') === -1 &&
					item.indexOf('wenshan') === -1 &&
					item.indexOf('wenzhou') === -1 &&
					item.indexOf('wuhai') === -1 &&
					item.indexOf('wuhu') === -1 &&
					item.indexOf('wulanchabu') === -1 &&
					item.indexOf('wulumuqi') === -1 &&
					item.indexOf('wuwei') === -1 &&
					item.indexOf('wuzhong') === -1 &&
					item.indexOf('wuzhou') === -1 &&
					item.indexOf('xiangfan') === -1 &&
					item.indexOf('xiangtan') === -1 &&
					item.indexOf('xiangxi') === -1 &&
					item.indexOf('xianning') === -1 &&
					item.indexOf('xianyang') === -1 &&
					item.indexOf('xiaogan') === -1 &&
					item.indexOf('xilinguolemeng') === -1 &&
					item.indexOf('xinganmeng') === -1 &&
					item.indexOf('xingtai') === -1 &&
					item.indexOf('xining') === -1 &&
					item.indexOf('xinxiang') === -1 &&
					item.indexOf('xinyang') === -1 &&
					item.indexOf('xinyu') === -1 &&
					item.indexOf('xinzhou') === -1 &&
					item.indexOf('xishuangbanna') === -1 &&
					item.indexOf('xuancheng') === -1 &&
					item.indexOf('yaan') === -1 &&
					item.indexOf('yanan') === -1 &&
					item.indexOf('yanbian') === -1 &&
					item.indexOf('yancheng') === -1 &&
					item.indexOf('yangjiang') === -1 &&
					item.indexOf('yangquan') === -1 &&
					item.indexOf('yibin') === -1 &&
					item.indexOf('yichang') === -1 &&
					item.indexOf('yichun') === -1 &&
					item.indexOf('yichun') === -1 &&
					item.indexOf('yilihasake') === -1 &&
					item.indexOf('yinchuan') === -1 &&
					item.indexOf('yingkou') === -1 &&
					item.indexOf('yingtan') === -1 &&
					item.indexOf('yiyang') === -1 &&
					item.indexOf('yongzhou') === -1 &&
					item.indexOf('yueyang') === -1 &&
					item.indexOf('yulin') === -1 &&
					item.indexOf('yulin') === -1 &&
					item.indexOf('yuncheng') === -1 &&
					item.indexOf('yunfu') === -1 &&
					item.indexOf('yushu') === -1 &&
					item.indexOf('yuxi') === -1 &&
					item.indexOf('zaozhuang') === -1 &&
					item.indexOf('zhangjiajie') === -1 &&
					item.indexOf('zhangjiakou') === -1 &&
					item.indexOf('zhangye') === -1 &&
					item.indexOf('zhanjiang') === -1 &&
					item.indexOf('zhaoqing') === -1 &&
					item.indexOf('zhaotong') === -1 &&
					item.indexOf('zhenjiang') === -1 &&
					item.indexOf('zhongwei') === -1 &&
					item.indexOf('zhoukou') === -1 &&
					item.indexOf('zhoushan') === -1 &&
					item.indexOf('zhumadian') === -1 &&
					item.indexOf('zhuzhou') === -1 &&
					item.indexOf('zibo') === -1 &&
					item.indexOf('zigong') === -1 &&
					item.indexOf('ziyang') === -1 &&
					item.indexOf('zunyi') === -1 &&
					item.indexOf('acheng') === -1 &&
					item.indexOf('anfu') === -1 &&
					item.indexOf('anji') === -1 &&
					item.indexOf('anning') === -1 &&
					item.indexOf('anqiu') === -1 &&
					item.indexOf('anxi') === -1 &&
					item.indexOf('anyi') === -1 &&
					item.indexOf('anyuan') === -1 &&
					item.indexOf('baoying') === -1 &&
					item.indexOf('bayan') === -1 &&
					item.indexOf('binhai') === -1 &&
					item.indexOf('binxian') === -1 &&
					item.indexOf('binyang') === -1 &&
					item.indexOf('bishan') === -1 &&
					item.indexOf('boai') === -1 &&
					item.indexOf('boluo') === -1 &&
					item.indexOf('boxing') === -1 &&
					item.indexOf('cangnan') === -1 &&
					item.indexOf('cangshan') === -1 &&
					item.indexOf('caoxian') === -1 &&
					item.indexOf('changdao') === -1 &&
					item.indexOf('changfeng') === -1 &&
					item.indexOf('changhai') === -1 &&
					item.indexOf('changle') === -1 &&
					item.indexOf('changle') === -1 &&
					item.indexOf('changshan') === -1 &&
					item.indexOf('changshu') === -1 &&
					item.indexOf('changtai') === -1 &&
					item.indexOf('changting') === -1 &&
					item.indexOf('changxing') === -1 &&
					item.indexOf('changyi') === -1 &&
					item.indexOf('chaoan') === -1 &&
					item.indexOf('chenggong') === -1 &&
					item.indexOf('chengkou') === -1 &&
					item.indexOf('chengwu') === -1 &&
					item.indexOf('chiping') === -1 &&
					item.indexOf('chongren') === -1 &&
					item.indexOf('chongyi') === -1 &&
					item.indexOf('chongzhou') === -1 &&
					item.indexOf('chunan') === -1 &&
					item.indexOf('cixi') === -1 &&
					item.indexOf('conghua') === -1 &&
					item.indexOf('congyang') === -1 &&
					item.indexOf('dafeng') === -1 &&
					item.indexOf('daishan') === -1 &&
					item.indexOf('dangshan') === -1 &&
					item.indexOf('dangtu') === -1 &&
					item.indexOf('danxian') === -1 &&
					item.indexOf('danyang') === -1 &&
					item.indexOf('dapu') === -1 &&
					item.indexOf('datian') === -1 &&
					item.indexOf('dayi') === -1 &&
					item.indexOf('dayu') === -1 &&
					item.indexOf('dazu') === -1 &&
					item.indexOf('dean') === -1 &&
					item.indexOf('dehua') === -1 &&
					item.indexOf('dehui') === -1 &&
					item.indexOf('dengfeng') === -1 &&
					item.indexOf('deqing') === -1 &&
					item.indexOf('deqing') === -1 &&
					item.indexOf('dexing') === -1 &&
					item.indexOf('dianbai') === -1 &&
					item.indexOf('dianjiang') === -1 &&
					item.indexOf('dingnan') === -1 &&
					item.indexOf('dingtao') === -1 &&
					item.indexOf('dingyuan') === -1 &&
					item.indexOf('donga') === -1 &&
					item.indexOf('donghai') === -1 &&
					item.indexOf('dongming') === -1 &&
					item.indexOf('dongping') === -1 &&
					item.indexOf('dongshan') === -1 &&
					item.indexOf('dongtai') === -1 &&
					item.indexOf('dongtou') === -1 &&
					item.indexOf('dongxiang') === -1 &&
					item.indexOf('dongyang') === -1 &&
					item.indexOf('dongyuan') === -1 &&
					item.indexOf('dongzhi') === -1 &&
					item.indexOf('duchang') === -1 &&
					item.indexOf('dujiangyan') === -1 &&
					item.indexOf('enping') === -1 &&
					item.indexOf('faku') === -1 &&
					item.indexOf('fanchang') === -1 &&
					item.indexOf('fangzheng') === -1 &&
					item.indexOf('feicheng') === -1 &&
					item.indexOf('feidong') === -1 &&
					item.indexOf('feixi') === -1 &&
					item.indexOf('feixian') === -1 &&
					item.indexOf('fengcheng') === -1 &&
					item.indexOf('fengdu') === -1 &&
					item.indexOf('fenghua') === -1 &&
					item.indexOf('fengjie') === -1 &&
					item.indexOf('fengkai') === -1 &&
					item.indexOf('fengshun') === -1 &&
					item.indexOf('fengtai') === -1 &&
					item.indexOf('fengxian') === -1 &&
					item.indexOf('fengxin') === -1 &&
					item.indexOf('fengyang') === -1 &&
					item.indexOf('fenyi') === -1 &&
					item.indexOf('fogang') === -1 &&
					item.indexOf('fuan') === -1 &&
					item.indexOf('fuding') === -1 &&
					item.indexOf('fuliang') === -1 &&
					item.indexOf('fumin') === -1 &&
					item.indexOf('funan') === -1 &&
					item.indexOf('funing') === -1 &&
					item.indexOf('fuqing') === -1 &&
					item.indexOf('fuyang') === -1 &&
					item.indexOf('ganxian') === -1 &&
					item.indexOf('ganyu') === -1 &&
					item.indexOf('gaoan') === -1 &&
					item.indexOf('gaocheng') === -1 &&
					item.indexOf('gaochun') === -1 &&
					item.indexOf('gaolan') === -1 &&
					item.indexOf('gaoling') === -1 &&
					item.indexOf('gaomi') === -1 &&
					item.indexOf('gaoqing') === -1 &&
					item.indexOf('gaotang') === -1 &&
					item.indexOf('gaoyao') === -1 &&
					item.indexOf('gaoyi') === -1 &&
					item.indexOf('gaoyou') === -1 &&
					item.indexOf('gaozhou') === -1 &&
					item.indexOf('gongyi') === -1 &&
					item.indexOf('guangchang') === -1 &&
					item.indexOf('guangde') === -1 &&
					item.indexOf('guangfeng') === -1 &&
					item.indexOf('guangning') === -1 &&
					item.indexOf('guangrao') === -1 &&
					item.indexOf('guangze') === -1 &&
					item.indexOf('guannan') === -1 &&
					item.indexOf('guanxian') === -1 &&
					item.indexOf('guanyun') === -1 &&
					item.indexOf('guixi') === -1 &&
					item.indexOf('gutian') === -1 &&
					item.indexOf('guzhen') === -1 &&
					item.indexOf('haian') === -1 &&
					item.indexOf('haifeng') === -1 &&
					item.indexOf('haimen') === -1 &&
					item.indexOf('haining') === -1 &&
					item.indexOf('haiyan') === -1 &&
					item.indexOf('haiyang') === -1 &&
					item.indexOf('hanshan') === -1 &&
					item.indexOf('hechuan') === -1 &&
					item.indexOf('hengfeng') === -1 &&
					item.indexOf('hengxian') === -1 &&
					item.indexOf('heping') === -1 &&
					item.indexOf('heshan') === -1 &&
					item.indexOf('hexian') === -1 &&
					item.indexOf('hongze') === -1 &&
					item.indexOf('huaan') === -1 &&
					item.indexOf('huadian') === -1 &&
					item.indexOf('huaiji') === -1 &&
					item.indexOf('huaining') === -1 &&
					item.indexOf('huaiyuan') === -1 &&
					item.indexOf('huantai') === -1 &&
					item.indexOf('huazhou') === -1 &&
					item.indexOf('huian') === -1 &&
					item.indexOf('huichang') === -1 &&
					item.indexOf('huidong') === -1 &&
					item.indexOf('huilai') === -1 &&
					item.indexOf('huimin') === -1 &&
					item.indexOf('hukou') === -1 &&
					item.indexOf('hulan') === -1 &&
					item.indexOf('huoqiu') === -1 &&
					item.indexOf('huoshan') === -1 &&
					item.indexOf('huxian') === -1 &&
					item.indexOf('jiande') === -1 &&
					item.indexOf('jiangdu') === -1 &&
					item.indexOf('jiangjin') === -1 &&
					item.indexOf('jiangle') === -1 &&
					item.indexOf('jiangshan') === -1 &&
					item.indexOf('jiangyan') === -1 &&
					item.indexOf('jiangyin') === -1 &&
					item.indexOf('jianhu') === -1 &&
					item.indexOf('jianning') === -1 &&
					item.indexOf('jianou') === -1 &&
					item.indexOf('jianyang') === -1 &&
					item.indexOf('jian') === -1 &&
					item.indexOf('jiaohe') === -1 &&
					item.indexOf('jiaoling') === -1 &&
					item.indexOf('jiaonan') === -1 &&
					item.indexOf('jiaozhou') === -1 &&
					item.indexOf('jiashan') === -1 &&
					item.indexOf('jiaxiang') === -1 &&
					item.indexOf('jiedong') === -1 &&
					item.indexOf('jieshou') === -1 &&
					item.indexOf('jiexi') === -1 &&
					item.indexOf('jimo') === -1 &&
					item.indexOf('jingan') === -1 &&
					item.indexOf('jingde') === -1 &&
					item.indexOf('jinggangshan') === -1 &&
					item.indexOf('jingjiang') === -1 &&
					item.indexOf('jingning') === -1 &&
					item.indexOf('jingxian') === -1 &&
					item.indexOf('jingxing') === -1 &&
					item.indexOf('jinhu') === -1 &&
					item.indexOf('jinjiang') === -1 &&
					item.indexOf('jinmen') === -1 &&
					item.indexOf('jinning') === -1 &&
					item.indexOf('jintan') === -1 &&
					item.indexOf('jintang') === -1 &&
					item.indexOf('jinxian') === -1 &&
					item.indexOf('jinxi') === -1 &&
					item.indexOf('jinxiang') === -1 &&
					item.indexOf('jinyun') === -1 &&
					item.indexOf('jinzhai') === -1 &&
					item.indexOf('jinzhou') === -1 &&
					item.indexOf('jishui') === -1 &&
					item.indexOf('jiujiang') === -1 &&
					item.indexOf('jiutai') === -1 &&
					item.indexOf('jixi') === -1 &&
					item.indexOf('jiyang') === -1 &&
					item.indexOf('jiyuan') === -1 &&
					item.indexOf('juancheng') === -1 &&
					item.indexOf('junan') === -1 &&
					item.indexOf('jurong') === -1 &&
					item.indexOf('juxian') === -1 &&
					item.indexOf('juye') === -1 &&
					item.indexOf('kaihua') === -1 &&
					item.indexOf('kaiping') === -1 &&
					item.indexOf('kaixian') === -1 &&
					item.indexOf('kaiyang') === -1 &&
					item.indexOf('kangping') === -1 &&
					item.indexOf('kenli') === -1 &&
					item.indexOf('kunshan') === -1 &&
					item.indexOf('laian') === -1 &&
					item.indexOf('laixi') === -1 &&
					item.indexOf('laiyang') === -1 &&
					item.indexOf('laizhou') === -1 &&
					item.indexOf('langxi') === -1 &&
					item.indexOf('lantian') === -1 &&
					item.indexOf('lanxi') === -1 &&
					item.indexOf('lean') === -1 &&
					item.indexOf('lechang') === -1 &&
					item.indexOf('leizhou') === -1 &&
					item.indexOf('leling') === -1 &&
					item.indexOf('leping') === -1 &&
					item.indexOf('leqing') === -1 &&
					item.indexOf('leting') === -1 &&
					item.indexOf('liancheng') === -1 &&
					item.indexOf('liangping') === -1 &&
					item.indexOf('liangshan') === -1 &&
					item.indexOf('lianhua') === -1 &&
					item.indexOf('lianjiang') === -1 &&
					item.indexOf('lianjiang') === -1 &&
					item.indexOf('liannan') === -1 &&
					item.indexOf('lianping') === -1 &&
					item.indexOf('lianshan') === -1 &&
					item.indexOf('lianshui') === -1 &&
					item.indexOf('lianzhou') === -1 &&
					item.indexOf('liaozhong') === -1 &&
					item.indexOf('lichuan') === -1 &&
					item.indexOf('lijin') === -1 &&
					item.indexOf('linan') === -1 &&
					item.indexOf('lingbi') === -1 &&
					item.indexOf('lingshou') === -1 &&
					item.indexOf('lingxian') === -1 &&
					item.indexOf('linhai') === -1 &&
					item.indexOf('linqing') === -1 &&
					item.indexOf('linquan') === -1 &&
					item.indexOf('linqu') === -1 &&
					item.indexOf('linshu') === -1 &&
					item.indexOf('linyi') === -1 &&
					item.indexOf('lishui') === -1 &&
					item.indexOf('liucheng') === -1 &&
					item.indexOf('liujiang') === -1 &&
					item.indexOf('liuyang') === -1 &&
					item.indexOf('lixin') === -1 &&
					item.indexOf('liyang') === -1 &&
					item.indexOf('longan') === -1 &&
					item.indexOf('longchuan') === -1 &&
					item.indexOf('longhai') === -1 &&
					item.indexOf('longkou') === -1 &&
					item.indexOf('longmen') === -1 &&
					item.indexOf('longnan') === -1 &&
					item.indexOf('longquan') === -1 &&
					item.indexOf('longyou') === -1 &&
					item.indexOf('luancheng') === -1 &&
					item.indexOf('luanchuan') === -1 &&
					item.indexOf('luannan') === -1 &&
					item.indexOf('luanxian') === -1 &&
					item.indexOf('lufeng') === -1 &&
					item.indexOf('luhe') === -1 &&
					item.indexOf('lujiang') === -1 &&
					item.indexOf('luoding') === -1 &&
					item.indexOf('luoning') === -1 &&
					item.indexOf('luoyuan') === -1 &&
					item.indexOf('luquan') === -1 &&
					item.indexOf('luquan') === -1 &&
					item.indexOf('luxi') === -1 &&
					item.indexOf('luzhai') === -1 &&
					item.indexOf('mashan') === -1 &&
					item.indexOf('meixian') === -1 &&
					item.indexOf('mengcheng') === -1 &&
					item.indexOf('mengjin') === -1 &&
					item.indexOf('mengyin') === -1 &&
					item.indexOf('mengzhou') === -1 &&
					item.indexOf('mingguang') === -1 &&
					item.indexOf('mingxi') === -1 &&
					item.indexOf('minhou') === -1 &&
					item.indexOf('minqing') === -1 &&
					item.indexOf('mulan') === -1 &&
					item.indexOf('nanan') === -1 &&
					item.indexOf('nanao') === -1 &&
					item.indexOf('nancheng') === -1 &&
					item.indexOf('nanchuan') === -1 &&
					item.indexOf('nanfeng') === -1 &&
					item.indexOf('nanjing') === -1 &&
					item.indexOf('nankang') === -1 &&
					item.indexOf('nanling') === -1 &&
					item.indexOf('nanxiong') === -1 &&
					item.indexOf('ningdu') === -1 &&
					item.indexOf('ningguo') === -1 &&
					item.indexOf('ninghai') === -1 &&
					item.indexOf('ninghua') === -1 &&
					item.indexOf('ningjin') === -1 &&
					item.indexOf('ningxiang') === -1 &&
					item.indexOf('ningyang') === -1 &&
					item.indexOf('nongan') === -1 &&
					item.indexOf('panan') === -1 &&
					item.indexOf('panshi') === -1 &&
					item.indexOf('peixian') === -1 &&
					item.indexOf('penglai') === -1 &&
					item.indexOf('pengshui') === -1 &&
					item.indexOf('pengze') === -1 &&
					item.indexOf('pengzhou') === -1 &&
					item.indexOf('pingdu') === -1 &&
					item.indexOf('pinghe') === -1 &&
					item.indexOf('pinghu') === -1 &&
					item.indexOf('pingnan') === -1 &&
					item.indexOf('pingshan') === -1 &&
					item.indexOf('pingtan') === -1 &&
					item.indexOf('pingyang') === -1 &&
					item.indexOf('pingyin') === -1 &&
					item.indexOf('pingyi') === -1 &&
					item.indexOf('pingyuan') === -1 &&
					item.indexOf('pingyuan') === -1 &&
					item.indexOf('pixian') === -1 &&
					item.indexOf('pizhou') === -1 &&
					item.indexOf('poyang') === -1 &&
					item.indexOf('pucheng') === -1 &&
					item.indexOf('pujiang') === -1 &&
					item.indexOf('pujiang') === -1 &&
					item.indexOf('pulandian') === -1 &&
					item.indexOf('puning') === -1 &&
					item.indexOf('qianan') === -1 &&
					item.indexOf('qianshan') === -1 &&
					item.indexOf('qianshan') === -1 &&
					item.indexOf('qianxi') === -1 &&
					item.indexOf('qidong') === -1 &&
					item.indexOf('qihe') === -1 &&
					item.indexOf('qijiang') === -1 &&
					item.indexOf('qimen') === -1 &&
					item.indexOf('qingliu') === -1 &&
					item.indexOf('qingtian') === -1 &&
					item.indexOf('qingxin') === -1 &&
					item.indexOf('qingyang') === -1 &&
					item.indexOf('qingyuan') === -1 &&
					item.indexOf('qingyun') === -1 &&
					item.indexOf('qingzhen') === -1 &&
					item.indexOf('qingzhou') === -1 &&
					item.indexOf('qinyang') === -1 &&
					item.indexOf('qionglai') === -1 &&
					item.indexOf('qixia') === -1 &&
					item.indexOf('quanjiao') === -1 &&
					item.indexOf('quannan') === -1 &&
					item.indexOf('qufu') === -1 &&
					item.indexOf('qujiang') === -1 &&
					item.indexOf('raoping') === -1 &&
					item.indexOf('renhua') === -1 &&
					item.indexOf('rongan') === -1 &&
					item.indexOf('rongchang') === -1 &&
					item.indexOf('rongcheng') === -1 &&
					item.indexOf('rongshui') === -1 &&
					item.indexOf('rudong') === -1 &&
					item.indexOf('rugao') === -1 &&
					item.indexOf('ruian') === -1 &&
					item.indexOf('ruichang') === -1 &&
					item.indexOf('ruijin') === -1 &&
					item.indexOf('rushan') === -1 &&
					item.indexOf('ruyang') === -1 &&
					item.indexOf('ruyuan') === -1 &&
					item.indexOf('sanjiang') === -1 &&
					item.indexOf('sanmen') === -1 &&
					item.indexOf('saoan') === -1 &&
					item.indexOf('shanggao') === -1 &&
					item.indexOf('shanghang') === -1 &&
					item.indexOf('shanghe') === -1 &&
					item.indexOf('shangli') === -1 &&
					item.indexOf('shanglin') === -1 &&
					item.indexOf('shangrao') === -1 &&
					item.indexOf('shangyou') === -1 &&
					item.indexOf('shangyu') === -1 &&
					item.indexOf('shangzhi') === -1 &&
					item.indexOf('shaowu') === -1 &&
					item.indexOf('shaoxing') === -1 &&
					item.indexOf('shaxian') === -1 &&
					item.indexOf('shengsi') === -1 &&
					item.indexOf('shengzhou') === -1 &&
					item.indexOf('shenxian') === -1 &&
					item.indexOf('shenze') === -1 &&
					item.indexOf('shexian') === -1 &&
					item.indexOf('sheyang') === -1 &&
					item.indexOf('shicheng') === -1 &&
					item.indexOf('shilin') === -1 &&
					item.indexOf('shishi') === -1 &&
					item.indexOf('shitai') === -1 &&
					item.indexOf('shixing') === -1 &&
					item.indexOf('shizhu') === -1 &&
					item.indexOf('shouguang') === -1 &&
					item.indexOf('shouning') === -1 &&
					item.indexOf('shouxian') === -1 &&
					item.indexOf('shuangcheng') === -1 &&
					item.indexOf('shuangliu') === -1 &&
					item.indexOf('shucheng') === -1 &&
					item.indexOf('shulan') === -1 &&
					item.indexOf('shunchang') === -1 &&
					item.indexOf('shuyang') === -1 &&
					item.indexOf('sihong') === -1 &&
					item.indexOf('sihui') === -1 &&
					item.indexOf('sishui') === -1 &&
					item.indexOf('sixian') === -1 &&
					item.indexOf('siyang') === -1 &&
					item.indexOf('songming') === -1 &&
					item.indexOf('songxi') === -1 &&
					item.indexOf('songxian') === -1 &&
					item.indexOf('songyang') === -1 &&
					item.indexOf('suichang') === -1 &&
					item.indexOf('suichuan') === -1 &&
					item.indexOf('suining') === -1 &&
					item.indexOf('suixi') === -1 &&
					item.indexOf('suixi') === -1 &&
					item.indexOf('susong') === -1 &&
					item.indexOf('suyu') === -1 &&
					item.indexOf('taicang') === -1 &&
					item.indexOf('taihe') === -1 &&
					item.indexOf('taihe') === -1 &&
					item.indexOf('taihu') === -1 &&
					item.indexOf('taining') === -1 &&
					item.indexOf('taishan') === -1 &&
					item.indexOf('taishun') === -1 &&
					item.indexOf('taixing') === -1 &&
					item.indexOf('tancheng') === -1 &&
					item.indexOf('tanghai') === -1 &&
					item.indexOf('tengzhou') === -1 &&
					item.indexOf('tianchang') === -1 &&
					item.indexOf('tiantai') === -1 &&
					item.indexOf('tongcheng') === -1 &&
					item.indexOf('tonggu') === -1 &&
					item.indexOf('tonghe') === -1 &&
					item.indexOf('tongliang') === -1 &&
					item.indexOf('tongling') === -1 &&
					item.indexOf('tonglu') === -1 &&
					item.indexOf('tongnan') === -1 &&
					item.indexOf('tongshan') === -1 &&
					item.indexOf('tongxiang') === -1 &&
					item.indexOf('tongzhou') === -1 &&
					item.indexOf('wafangdian') === -1 &&
					item.indexOf('wanan') === -1 &&
					item.indexOf('wangcheng') === -1 &&
					item.indexOf('wangjiang') === -1 &&
					item.indexOf('wannian') === -1 &&
					item.indexOf('wanzai') === -1 &&
					item.indexOf('weishan') === -1 &&
					item.indexOf('wencheng') === -1 &&
					item.indexOf('wendeng') === -1 &&
					item.indexOf('wengyuan') === -1 &&
					item.indexOf('wenling') === -1 &&
					item.indexOf('wenshang') === -1 &&
					item.indexOf('wenxian') === -1 &&
					item.indexOf('woyang') === -1 &&
					item.indexOf('wuchang') === -1 &&
					item.indexOf('wucheng') === -1 &&
					item.indexOf('wuchuan') === -1 &&
					item.indexOf('wudi') === -1 &&
					item.indexOf('wuhe') === -1 &&
					item.indexOf('wuhu') === -1 &&
					item.indexOf('wuhua') === -1 &&
					item.indexOf('wuji') === -1 &&
					item.indexOf('wujiang') === -1 &&
					item.indexOf('wulian') === -1 &&
					item.indexOf('wulong') === -1 &&
					item.indexOf('wuming') === -1 &&
					item.indexOf('wuning') === -1 &&
					item.indexOf('wuping') === -1 &&
					item.indexOf('wushan') === -1 &&
					item.indexOf('wuwei') === -1 &&
					item.indexOf('wuxi') === -1 &&
					item.indexOf('wuyi') === -1 &&
					item.indexOf('wuyishan') === -1 &&
					item.indexOf('wuyuan') === -1 &&
					item.indexOf('wuzhi') === -1 &&
					item.indexOf('xiajiang') === -1 &&
					item.indexOf('xiajin') === -1 &&
					item.indexOf('xiangshan') === -1 &&
					item.indexOf('xiangshui') === -1 &&
					item.indexOf('xianju') === -1 &&
					item.indexOf('xianyou') === -1 &&
					item.indexOf('xiaoxian') === -1 &&
					item.indexOf('xiapu') === -1 &&
					item.indexOf('xifeng') === -1 &&
					item.indexOf('xinan') === -1 &&
					item.indexOf('xinchang') === -1 &&
					item.indexOf('xinfeng') === -1 &&
					item.indexOf('xinfeng') === -1 &&
					item.indexOf('xingan') === -1 &&
					item.indexOf('xingguo') === -1 &&
					item.indexOf('xinghua') === -1 &&
					item.indexOf('xingning') === -1 &&
					item.indexOf('xingtang') === -1 &&
					item.indexOf('xingyang') === -1 &&
					item.indexOf('xingzi') === -1 &&
					item.indexOf('xinji') === -1 &&
					item.indexOf('xinjian') === -1 &&
					item.indexOf('xinjin') === -1 &&
					item.indexOf('xinle') === -1 &&
					item.indexOf('xinmin') === -1 &&
					item.indexOf('xinmi') === -1 &&
					item.indexOf('xintai') === -1 &&
					item.indexOf('xinxing') === -1 &&
					item.indexOf('xinyi') === -1 &&
					item.indexOf('xinyi') === -1 &&
					item.indexOf('xinzheng') === -1 &&
					item.indexOf('xiuning') === -1 &&
					item.indexOf('xiushan') === -1 &&
					item.indexOf('xiushui') === -1 &&
					item.indexOf('xiuwen') === -1 &&
					item.indexOf('xiuwu') === -1 &&
					item.indexOf('xundian') === -1 &&
					item.indexOf('xunwu') === -1 &&
					item.indexOf('xuwen') === -1 &&
					item.indexOf('xuyi') === -1 &&
					item.indexOf('yangchun') === -1 &&
					item.indexOf('yangdong') === -1 &&
					item.indexOf('yanggu') === -1 &&
					item.indexOf('yangshan') === -1 &&
					item.indexOf('yangxin') === -1 &&
					item.indexOf('yangxi') === -1 &&
					item.indexOf('yangzhong') === -1 &&
					item.indexOf('yanshi') === -1 &&
					item.indexOf('yanshou') === -1 &&
					item.indexOf('yanzhou') === -1 &&
					item.indexOf('yichuan') === -1 &&
					item.indexOf('yifeng') === -1 &&
					item.indexOf('yihuang') === -1 &&
					item.indexOf('yilan') === -1 &&
					item.indexOf('yiliang') === -1 &&
					item.indexOf('yinan') === -1 &&
					item.indexOf('yingde') === -1 &&
					item.indexOf('yingshang') === -1 &&
					item.indexOf('yishui') === -1 &&
					item.indexOf('yiwu') === -1 &&
					item.indexOf('yixian') === -1 &&
					item.indexOf('yixing') === -1 &&
					item.indexOf('yiyang') === -1 &&
					item.indexOf('yiyang') === -1 &&
					item.indexOf('yiyuan') === -1 &&
					item.indexOf('yizheng') === -1 &&
					item.indexOf('yongan') === -1 &&
					item.indexOf('yongchuan') === -1 &&
					item.indexOf('yongchun') === -1 &&
					item.indexOf('yongdeng') === -1 &&
					item.indexOf('yongding') === -1 &&
					item.indexOf('yongfeng') === -1 &&
					item.indexOf('yongji') === -1 &&
					item.indexOf('yongjia') === -1 &&
					item.indexOf('yongkang') === -1 &&
					item.indexOf('yongning') === -1 &&
					item.indexOf('yongtai') === -1 &&
					item.indexOf('yongxin') === -1 &&
					item.indexOf('yongxiu') === -1 &&
					item.indexOf('youxi') === -1 &&
					item.indexOf('youyang') === -1 &&
					item.indexOf('yuanshi') === -1 &&
					item.indexOf('yucheng') === -1 &&
					item.indexOf('yudu') === -1 &&
					item.indexOf('yuexi') === -1 &&
					item.indexOf('yugan') === -1 &&
					item.indexOf('yuhuan') === -1 &&
					item.indexOf('yujiang') === -1 &&
					item.indexOf('yunan') === -1 &&
					item.indexOf('yunan') === -1 &&
					item.indexOf('yuncheng') === -1 &&
					item.indexOf('yunhe') === -1 &&
					item.indexOf('yunxiao') === -1 &&
					item.indexOf('yunyang') === -1 &&
					item.indexOf('yushan') === -1 &&
					item.indexOf('yushu') === -1 &&
					item.indexOf('yutai') === -1 &&
					item.indexOf('yutian') === -1 &&
					item.indexOf('yuyao') === -1 &&
					item.indexOf('yuzhong') === -1 &&
					item.indexOf('zanhuang') === -1 &&
					item.indexOf('zengcheng') === -1 &&
					item.indexOf('zhangjiagang') === -1 &&
					item.indexOf('zhangping') === -1 &&
					item.indexOf('zhangpu') === -1 &&
					item.indexOf('zhangqiu') === -1 &&
					item.indexOf('zhangshu') === -1 &&
					item.indexOf('zhanhua') === -1 &&
					item.indexOf('zhaoxian') === -1 &&
					item.indexOf('zhaoyuan') === -1 &&
					item.indexOf('zhengding') === -1 &&
					item.indexOf('zhenghe') === -1 &&
					item.indexOf('zherong') === -1 &&
					item.indexOf('zhongmou') === -1 &&
					item.indexOf('zhongxian') === -1 &&
					item.indexOf('zhouning') === -1 &&
					item.indexOf('zhouzhi') === -1 &&
					item.indexOf('zhuanghe') === -1 &&
					item.indexOf('zhucheng') === -1 &&
					item.indexOf('zhuji') === -1 &&
					item.indexOf('zijin') === -1 &&
					item.indexOf('zixi') === -1 &&
					item.indexOf('zoucheng') === -1 &&
					item.indexOf('zouping') === -1 &&
					item.indexOf('zunhua') === -1 &&
                    item.indexOf('.gif') === -1) {
                    lastArr.push(item)
                }
            }) 

            for (let url of lastArr) {
                let agent = 'p'
                if (url.indexOf('//m.') > -1 || url.indexOf('//wap.') > -1) agent = 'm'
                Reptile.find({ url: url }).exec((err, rept) => {
                    if (!err) {
                        if (rept && rept.length > 0) return
                        Reptile.create({
                            id: uuidv1(),
                            url: url,
                            index: String(count++),
							host: /^http(s)?:\/\/(.*?)\//.exec(url),
							status: '0',
                            agent: agent
                        }, err => {
                            if (err) {
                                console.log('insert data err:%s', err)
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = new Service()