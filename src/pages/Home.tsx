import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Sort, Categories, PizzaBlock, Skeleton, Pagination } from '../components';

import { sortList } from '../components/Sort';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, currentPage, sort, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  // // якщо параметри змінилися і відбувся перший рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // // якщо був перший рендер, зберігаємо URL-параметри і зберігаємо в редакс
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // якщо відбувся перший рендер, робимо запит об'єкту з піцами
  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Виникла помилка 😢</h2>
          <p>На жаль, не вдалося отримати піци. Спробуйте пізніше.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
