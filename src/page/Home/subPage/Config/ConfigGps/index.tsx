import React, { ReactElement, useEffect, useState, useRef } from 'react'
import Select from '@/component/form/Select'
import { getTime } from '@/utils/tool'
import { Button, Tooltip } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import './index.less'

interface Props {
    
}

interface RefType {
    current: any;
    [propName: string]: any;
}

declare var AMap: any;


const optionList = [
    {
        name: 'Driving',
        label: '驾车'
    },
    {
        name: 'Walking',
        label: '步行'
    },
    {
        name: 'Riding',
        label: '骑行'
    },
    {
        name: 'Transfer',
        label: '公交'
    },
]

// let panelStatus: boolean = false

export default function ConfigGps({}: Props): ReactElement {

    const paneRef: RefType = useRef()
    const paneBtnRef: RefType = useRef()

    const [rute, setRute] = useState('Driving')
    const [currentIp, setCurrentIp] = useState<any>({})
    const [panelStatus, setPanelStatus] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        paneRef.current.innerHTML = ''
        paneRef.current.style = ''
        paneBtnRef.current.style = ''
        setPanelStatus(false)

        setLoading(true)
        let position = {}
        var map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom:11, //初始化地图层级
            // center: [104.065735, 30.659462] //初始化地图中心点
        });
       

        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                //@ts-ignore
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                // const position = result.position
                const { 
                    position,
                    formattedAddress
                } = result
                console.log(result, '00000---')
                setCurrentIp({
                    formattedAddress
                })
                // ruteType('Driving', map, position)  //驾车
                // ruteType('Walking', map, position) //步行
                // ruteType('Riding', map, position)    //骑行
                ruteType(rute, map, position)    //公交
                
            });
        });

        // 实例化点标记
        function addMarker() {
            let marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [103.96411,30.673492], //中坝
                offset: new AMap.Pixel(-13, -30)
            });
            marker.setMap(map);
        }
        addMarker()


        //搜索
        // AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
        //     var autoOptions = {
        //         city: '成都',
        //         input: "keyword"//使用联想输入的input的id
        //     };
        //     let autocomplete= new AMap.Autocomplete(autoOptions);
        //     var placeSearch = new AMap.PlaceSearch({
        //           map:map
        //     })
        //     AMap.event.addListener(autocomplete, "select", function(e){
        //        //TODO 针对选中的poi实现自己的功能
        //        placeSearch.setCity(e.poi.adcode);
        //        placeSearch.search(e.poi.name)
        //     });
        //   });
    }, [rute])

    const ruteType = (type, map, position) => {
        const { lng, lat } = position

        let option = {
            Driving: {
                policy: AMap?.DrivingPolicy?.LEAST_TIME,
            },
            Transfer: {
                policy: AMap?.TransferPolicy?.LEAST_TIME,
                city: '成都市',
            },
            Walking: {},
            Riding: {}
        }
        console.log(option[type])
        AMap.plugin('AMap.' + type, function() {
            var driving = new AMap[type]({
              // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                ...option[type],
                map: map,
                panel: 'panel'
            })
            
            var startLngLat = [lng, lat]
            var endLngLat = [103.96411,30.673492]
            
            driving.search(startLngLat, endLngLat, function (status, result) {
                setLoading(false)
                const { routes, plans } = result
                setCurrentIp((obj => {
                    let routeInfo = routes ? routes[0] : plans[0]
                    let newObj = {...obj}
                    newObj.distance = routeInfo.distance
                    newObj.time = routeInfo.time
                    return newObj
                }))
              // 未出错时，result即是对应的路线规划方案
            })
        })
    }

    const onChange = (type) => {
        console.log(type)
        setRute(type)
    }

    const actionClick = () => {
        if(!panelStatus) {
            paneRef.current.style.right = '-300px'
            paneBtnRef.current.style.right = 0
        }else {
            paneRef.current.style = ''
            paneBtnRef.current.style = ''
        }
        setPanelStatus(a => !a)
    }

    // const onFocus = () => {}

    return (
        <>
            <div className='gps_title'>
                <div>当前位置: {currentIp.formattedAddress}</div>
                <div>交通方式: {optionList.find(item => item.name === rute).label}</div>
                <div>时间(路程): {getTime(currentIp.time)}({(currentIp.distance / 1000) || '--'}公里)</div>
                <div className='trans_mode'>
                    <span>交通方式:</span>
                    <Select  optionList={optionList} onChange={onChange} defaultValue={rute} className='select_gps' />
                </div>
            </div>
            <div id='container'></div>
            <div id='panel' ref={paneRef}></div>
            {!loading && <Tooltip placement="left" title={panelStatus ? '展开' : '收起'}>
                <Button 
                    className='actionBtn' 
                    ref={paneBtnRef} 
                    type='primary' 
                    icon={panelStatus ? <LeftOutlined /> : <RightOutlined />} 
                    onClick={actionClick}
                ></Button>
            </Tooltip>}
        </>
    )
}
