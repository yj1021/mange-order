import React, { ReactElement, useState } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '@/utils/tool'

interface FileLisType {
    uid: string;
    name: string;
    status: string;
    url?: string;
    [propName: string]: any;
}


interface Props {
    fileList?: any[];
    limit?: number;
    httpUrl?: string;
    uploadChange?: (list: any[]) => void;
}

export default function UploadPic({
    fileList = [],
    limit = 8,
    httpUrl = '/api/5cc8019d300000980a055e76',
    uploadChange
}: Props): ReactElement {
    const [prePic, setPrePic] = useState<any>({
        url: '',
        title: '',
        visible: false
    })

    const handleChange = ({fileList}) => {
        uploadChange && uploadChange(fileList)
    }

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        let { url, preview, name } = file
        setPrePic({
            url: url || preview,
            title: name,
            visible: true
        })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
    );

    const handleCancel = () => setPrePic(obj => ({...obj, visible: false}));
    return (
        <>
            <Upload
                action={httpUrl}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= limit ? null : uploadButton}
            </Upload>
            <Modal
                visible={prePic.visible}
                title={prePic.title}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={prePic.url} />
            </Modal>
        </>
    )
}
