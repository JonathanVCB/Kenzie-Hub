import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid var(--Grey-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  > img {
    object-fit: contain;
  }
  > a {
    background-color: var(--Grey-3);
    color: var(--Grey-0);
    text-decoration: none;
    padding: 1rem;
    padding: 0.8rem 1.7rem;
    font-size: 0.6rem;
    font-weight: 600;
    border-radius: 4px;
  }
  > a:hover {
    background-color: var(--Grey-2);
  }

  @media (min-width: 1024px) {
    padding: 0 25%;
  }
`;

export const DivBio = styled.div`
  width: 100%;
  height: 140px;
  border-bottom: 1px solid var(--Grey-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem;
  > h1 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--Grey-0);
  }

  > p {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--Grey-1);
  }
  @media (min-width: 1024px) {
    padding: 0 25%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
export const DivMessage = styled.div`
  width: 100%;
  padding: 2rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--Grey-0);
  }
  > p {
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
  }
  @media (min-width: 1024px) {
    padding: 2rem 25%;
  }
`;
