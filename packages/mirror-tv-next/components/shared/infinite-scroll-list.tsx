import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import styles from '~/styles/components/shared/infinite-scroll-list.module.scss'

type Children = (renderList: any[]) => JSX.Element

interface InfiniteScrollListProps {
  initialList?: any[]
  renderAmount: number
  fetchListInPage: (page: number) => Promise<any[]>
  children: Children
  loader: JSX.Element
  fetchCount: number
}

export default function InfiniteScrollList({
  initialList = [],
  renderAmount,
  fetchListInPage,
  children,
  fetchCount,
  loader,
}: InfiniteScrollListProps): JSX.Element {
  const [dataList, setDataList] = useState([...initialList])
  const initialPage = initialList.length ? 1 : 0
  const [fetchPage, setFetchPage] = useState(initialPage)
  const [renderCount, setRenderCount] = useState(renderAmount)
  const renderList = dataList.slice(0, renderCount)
  const [isLoading, setIsLoading] = useState(false)

  const hasUnFetchedData = useMemo(
    () => !(renderCount >= dataList.length && fetchPage >= fetchCount),
    [dataList.length, renderCount, fetchPage, fetchCount]
  )
  const isNotEnoughToRender =
    fetchPage < fetchCount && dataList.length - renderCount <= renderAmount

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }

    if (isNotEnoughToRender) {
      const newPage = fetchPage + 1
      setIsLoading(true)
      fetchListInPage(newPage).then((newList) => {
        if (newList && Array.isArray(newList)) {
          setDataList((oldList) => [...oldList, ...newList])
        }
        setFetchPage(newPage)
        setIsLoading(false)
      })
    }
    setRenderCount((pre) => (pre += renderAmount))
  }, [fetchListInPage, fetchPage, renderAmount, isLoading, isNotEnoughToRender])

  const loaderRef = useRef(null)

  useEffect(() => {
    let callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (hasUnFetchedData) {
            handleLoadMore()
          } else {
            observer.unobserve(entry.target)
          }
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasUnFetchedData, handleLoadMore])

  return (
    <div>
      <div className={styles.test}>
        <p>資料顯示狀態</p>
        <ul>
          <li>一次無限滾動應顯示 {renderAmount} 筆</li>
          <li>目前取得的資料共 {dataList.length} 筆</li>
          <li>目前顯示的資料共 {renderList.length} 筆</li>
          <li>
            {isNotEnoughToRender
              ? '取得的資料不足以顯示，需另外發request'
              : '取得的資料足以顯示，不需要發request'}
          </li>
          <li>最終應顯示 {renderCount} 筆</li>
        </ul>
        --
        <p>發request狀態</p>
        <ul>
          <li>目前已發request {fetchPage} 次</li>
          <li>最終應發request {fetchCount} 次</li>
        </ul>
        --
        <p>loading狀態</p>
        <ul>
          <li>正在發request中：{isLoading ? '是' : '否'}</li>
          <li>
            {hasUnFetchedData
              ? '仍有資料未被取得，開啟無限滾動功能'
              : '所有資料皆已被取得且顯示，關閉無限滾動功能'}
          </li>
          <li></li>
        </ul>
      </div>
      {children(renderList)}

      <div ref={loaderRef}>{hasUnFetchedData && loader}</div>
    </div>
  )
}
