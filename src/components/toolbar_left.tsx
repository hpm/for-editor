import * as React from 'react'
import { IToolbar, IWords } from '../index'
import '../lib/css/index.scss'
interface IP {
  onClick: (type: string) => void
  addImg: (file: File, index: number) => void
  toolbar: IToolbar
  words: IWords
}

interface IS {
  imgHidden: boolean
  imgList: File[]
  paraHidden: boolean
  titleHidden: boolean
  moreHidden: boolean
}

class Toolbars extends React.Component<IP, IS> {
  static defaultProps = {
    onClick: () => {},
    toolbar: {},
    words: {}
  }

  private timer: number
  private paraTimer: number
  private titleTimer: number
  private moreTimer: number

  constructor(props: IP) {
    super(props)

    this.state = {
      imgHidden: true,
      imgList: [],
      paraHidden: true,
      titleHidden: true,
      moreHidden: true
    }
  }

  onClick(type: string) {
    this.props.onClick(type)
  }

  paraMouseOver() {
    window.clearTimeout(this.paraTimer)
    this.setState({
      paraHidden: false
    })
  }

  paraMouseOut() {
    this.paraTimer = window.setTimeout(() => {
      this.setState({
        paraHidden: true
      })
    }, 150)
  }

  titleMouseOver() {
    window.clearTimeout(this.titleTimer)
    this.setState({
      titleHidden: false
    })
  }

  titleMouseOut() {
    this.paraTimer = window.setTimeout(() => {
      this.setState({
        titleHidden: true
      })
    }, 150)
  }

  moreMouseOver() {
    window.clearTimeout(this.moreTimer)
    this.setState({
      moreHidden: false
    })
  }

  moreMouseOut() {
    this.paraTimer = window.setTimeout(() => {
      this.setState({
        moreHidden: true
      })
    }, 150)
  }

  imgClick() {
    this.setState({
      imgHidden: !this.state.imgHidden
    })
  }

  imgMouseOver() {
    window.clearTimeout(this.timer)
    this.setState({
      imgHidden: false
    })
  }

  imgMouseOut() {
    this.timer = window.setTimeout(() => {
      this.setState({
        imgHidden: true
      })
    }, 150)
  }

  addImgUrl() {
    this.props.onClick('img')
  }

  addImgFile(e: any) {
    let { imgList } = this.state
    const index = imgList.length
    imgList.push(e.target.files[0])
    this.setState({
      imgList
    })
    this.props.addImg(e.target.files[0], index)
    e.target.value = ''
  }

  render() {
    const { toolbar, words } = this.props
    const { imgHidden } = this.state
    const { paraHidden } = this.state
    const { titleHidden } = this.state
    const { moreHidden } = this.state
    return (
      <>
        <div className="for-pc">
          <ul>
            {toolbar.undo && (
              <li onClick={() => this.onClick('undo')} title={`${words.undo} (ctrl+z)`}>
                <i className="foricon for-undo" />
              </li>
            )}
            {toolbar.redo && (
              <li onClick={() => this.onClick('redo')} title={`${words.redo} (ctrl+y)`}>
                <i className="foricon for-redo" />
              </li>
            )}
            {toolbar.h1 && (
              <li onClick={() => this.onClick('h1')} title={words.h1}>
                H1
              </li>
            )}
            {toolbar.h2 && (
              <li onClick={() => this.onClick('h2')} title={words.h2}>
                H2
              </li>
            )}
            {toolbar.h3 && (
              <li onClick={() => this.onClick('h3')} title={words.h3}>
                H3
              </li>
            )}
            {toolbar.h4 && (
              <li onClick={() => this.onClick('h4')} title={words.h4}>
                H4
              </li>
            )}
            {/* 引用 */}
            {toolbar.quote && (
              <li onClick={() => this.onClick('quote')} title={words.quote}>
                <i className="foricon for-quote" />
              </li>
            )}
            {/* 段落 */}
            {toolbar.para && (
              <li
                className="for-toolbar-para"
                onMouseOver={() => this.paraMouseOver()}
                onMouseOut={() => this.paraMouseOut()}
              >
                <i className="foricon for-text" />
                <ul style={paraHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('italic')} title={words.italic}>
                    {words.italic}
                  </li>
                  <li onClick={() => this.onClick('bold')} title={words.bold}>
                    {words.bold}
                  </li>
                  <li onClick={() => this.onClick('bolditalic')} title={words.bolditalic}>
                    {words.bolditalic}
                  </li>
                  <li onClick={() => this.onClick('delline')} title={words.delline}>
                    {words.delline}
                  </li>
                  <li onClick={() => this.onClick('underline')} title={words.underline}>
                    {words.underline}
                  </li>
                  <li onClick={() => this.onClick('keytext')} title={words.keytext}>
                    {words.keytext}
                  </li>
                </ul>
              </li>
            )}

            {/* 表格 */}
            {toolbar.table && (
              <li onClick={() => this.onClick('table')} title={words.table}>
                <i className="foricon for-table" />
              </li>
            )}

            {toolbar.img && (
              <li
                className="for-toolbar-img"
                onMouseOver={() => this.imgMouseOver()}
                onMouseOut={() => this.imgMouseOut()}
              >
                <i className="foricon for-image" />
                <ul style={imgHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.addImgUrl()}>{words.addImgLink}</li>
                  <li>
                    {words.addImg}
                    <input
                      type="file"
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      onChange={(e) => this.addImgFile(e)}
                    />
                  </li>
                </ul>
              </li>
            )}
            {toolbar.link && (
              <li onClick={() => this.onClick('link')} title={words.link}>
                <i className="foricon for-link" />
              </li>
            )}
            {toolbar.innercode && (
              <li onClick={() => this.onClick('innercode')} title={words.innercode}>
                <i className="foricon for-inner-code" />
              </li>
            )}
            {toolbar.code && (
              <li onClick={() => this.onClick('code')} title={words.code}>
                <i className="foricon for-code" />
              </li>
            )}
            {/* 折叠语法 */}
            {toolbar.collapse && (
              <li onClick={() => this.onClick('collapse')} title={words.collapse}>
                <i className="foricon for-collapse" />
              </li>
            )}
            {/* <li>
          <i className="foricon for-render" />
        </li> */}
            {/* katex支持 */}
            {toolbar.katex && (
              <li onClick={() => this.onClick('katex')} title={words.katex}>
                <i className="foricon for-katex" />
              </li>
            )}
            {toolbar.save && (
              <li onClick={() => this.onClick('save')} title={`${words.save} (ctrl+s)`}>
                <i className="foricon for-save" />
              </li>
            )}
          </ul>
        </div>

        <div className="for-mobile">
          <ul>
            {toolbar.undo && (
              <li onClick={() => this.onClick('undo')} title={`${words.undo} (ctrl+z)`}>
                <i className="foricon for-undo" />
              </li>
            )}
            {toolbar.redo && (
              <li onClick={() => this.onClick('redo')} title={`${words.redo} (ctrl+y)`}>
                <i className="foricon for-redo" />
              </li>
            )}
            {/* 折叠标题 */}
            <li
              className="for-toolbar-title"
              onMouseOver={() => this.titleMouseOver()}
              onMouseOut={() => this.titleMouseOut()}
            >
              <i className="foricon for-title" />
              <ul style={titleHidden ? { display: 'none' } : {}}>
                {toolbar.h1 && (
                  <li onClick={() => this.onClick('h1')} title={words.h1}>
                    {words.h1}
                  </li>
                )}
                {toolbar.h2 && (
                  <li onClick={() => this.onClick('h2')} title={words.h2}>
                    {words.h2}
                  </li>
                )}
                {toolbar.h3 && (
                  <li onClick={() => this.onClick('h3')} title={words.h3}>
                    {words.h3}
                  </li>
                )}
                {toolbar.h4 && (
                  <li onClick={() => this.onClick('h4')} title={words.h4}>
                    {words.h4}
                  </li>
                )}
              </ul>
            </li>

            {/* 段落 */}
            {toolbar.para && (
              <li
                className="for-toolbar-para"
                onMouseOver={() => this.paraMouseOver()}
                onMouseOut={() => this.paraMouseOut()}
              >
                <i className="foricon for-text" />
                <ul style={paraHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('italic')} title={words.italic}>
                    {words.italic}
                  </li>
                  <li onClick={() => this.onClick('bold')} title={words.bold}>
                    {words.bold}
                  </li>
                  <li onClick={() => this.onClick('bolditalic')} title={words.bolditalic}>
                    {words.bolditalic}
                  </li>
                  <li onClick={() => this.onClick('delline')} title={words.delline}>
                    {words.delline}
                  </li>
                  <li onClick={() => this.onClick('underline')} title={words.underline}>
                    {words.underline}
                  </li>
                  <li onClick={() => this.onClick('keytext')} title={words.keytext}>
                    {words.keytext}
                  </li>
                </ul>
              </li>
            )}

            {toolbar.img && (
              <li
                className="for-toolbar-img"
                onMouseOver={() => this.imgMouseOver()}
                onMouseOut={() => this.imgMouseOut()}
              >
                <i className="foricon for-image" />
                <ul style={imgHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.addImgUrl()}>{words.addImgLink}</li>
                  <li>
                    {words.addImg}
                    <input
                      type="file"
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      onChange={(e) => this.addImgFile(e)}
                    />
                  </li>
                </ul>
              </li>
            )}
            <li
              className="for-toolbar-more"
              onMouseOver={() => this.moreMouseOver()}
              onMouseOut={() => this.moreMouseOut()}
            >
              <i className="foricon for-more" />
              <ul style={moreHidden ? { display: 'none' } : {}}>
                {/* 引用 */}
                {toolbar.quote && (
                  <li onClick={() => this.onClick('quote')} title={words.quote}>
                    <i className="foricon for-quote" />
                    {words.quote}
                  </li>
                )}
                {/* 表格 */}
                {toolbar.table && (
                  <li onClick={() => this.onClick('table')} title={words.table}>
                    <i className="foricon for-table" />
                    {words.table}
                  </li>
                )}
                {toolbar.link && (
                  <li onClick={() => this.onClick('link')} title={words.link}>
                    <i className="foricon for-link" />
                    {words.link}
                  </li>
                )}
                {toolbar.innercode && (
                  <li onClick={() => this.onClick('innercode')} title={words.innercode}>
                    <i className="foricon for-inner-code" />
                    {words.innercode}
                  </li>
                )}
                {toolbar.code && (
                  <li onClick={() => this.onClick('code')} title={words.code}>
                    <i className="foricon for-code" />
                    {words.code}
                  </li>
                )}
                {/* 折叠语法 */}
                {toolbar.collapse && (
                  <li onClick={() => this.onClick('collapse')} title={words.collapse}>
                    <i className="foricon for-collapse" />
                    {words.collapse}
                  </li>
                )}
                {/* <li>
          <i className="foricon for-render" />
        </li> */}
                {/* katex支持 */}
                {toolbar.katex && (
                  <li onClick={() => this.onClick('katex')} title={words.katex}>
                    <i className="foricon for-katex" />
                    {words.katex}
                  </li>
                )}
              </ul>
            </li>
            {toolbar.save && (
              <li onClick={() => this.onClick('save')} title={`${words.save} (ctrl+s)`}>
                <i className="foricon for-save" />
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }
}

export default Toolbars
