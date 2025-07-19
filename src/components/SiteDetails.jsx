import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSiteDetail,
  updateAbout,
  updateTerms,
  updatePrivacy,
  updateFooter,
  addSocialMedia,
  deleteSocialMedia,
  clearSiteMessage,
} from '../redux/slices/siteDetailSlice';

import { Modal, Button, Card, Row, Col, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const SectionModal = ({ show, onHide, title, content, onSave }) => {
  const [value, setValue] = useState(content || '');

  useEffect(() => {
    setValue(content);
  }, [content]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button onClick={() => onSave(value)} variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const SiteDetails = () => {
  const dispatch = useDispatch();
  const { data, loading, error, successMessage } = useSelector(state => state.siteDetail);

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    dispatch(fetchSiteDetail());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) toast.success(successMessage);
    if (error) toast.error(error);
    dispatch(clearSiteMessage());
  }, [successMessage, error, dispatch]);

  const handleSave = (key, value) => {
    if (key === 'about') dispatch(updateAbout({ aboutTitle: data?.aboutTitle, aboutContent: value }));
    if (key === 'terms') dispatch(updateTerms({ termsContent: value }));
    if (key === 'privacy') dispatch(updatePrivacy({ privacyContent: value }));
    if (key === 'footer') dispatch(updateFooter({ footerAbout: value }));
    setActiveModal(null);
  };

  const handleAddSocial = (e) => {
    e.preventDefault();
    const platform = e.target.platform.value;
    const icon = e.target.icon.value;
    const link = e.target.link.value;
    dispatch(addSocialMedia({ platform, icon, link }));
    e.target.reset();
  };

  const handleDeleteSocial = (id) => {
    dispatch(deleteSocialMedia(id));
  };

  return (
    <div className="container py-4">
      <h3>Site Details</h3>
      {loading && <p>Loading...</p>}
      {data && (
        <>

          {/* ABOUT */}
          <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <h6>About</h6>
              <Button size="sm" onClick={() => setActiveModal('about')}>Edit</Button>
            </Card.Header>
            <Card.Body dangerouslySetInnerHTML={{ __html: data.aboutContent }} />
          </Card>

          {/* TERMS */}
          <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <h6>Terms & Conditions</h6>
              <Button size="sm" onClick={() => setActiveModal('terms')}>Edit</Button>
            </Card.Header>
            <Card.Body dangerouslySetInnerHTML={{ __html: data.termsContent }} />
          </Card>

          {/* PRIVACY */}
          <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <h6>Privacy Policy</h6>
              <Button size="sm" onClick={() => setActiveModal('privacy')}>Edit</Button>
            </Card.Header>
            <Card.Body dangerouslySetInnerHTML={{ __html: data.privacyContent }} />
          </Card>

          {/* FOOTER */}
          <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <h6>Footer Content</h6>
              <Button size="sm" onClick={() => setActiveModal('footer')}>Edit</Button>
            </Card.Header>
            <Card.Body dangerouslySetInnerHTML={{ __html: data.footerAbout }} />
          </Card>

          {/* SOCIAL MEDIA */}
          <Card className="mb-3">
            <Card.Header>
                <h6>Social Media Links</h6>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddSocial} className="row g-3 mb-3">
                <Form.Group className="col-md-3">
                  <Form.Control name="platform" placeholder="Platform (e.g. Facebook)" required />
                </Form.Group>
                <Form.Group className="col-md-3">
                  <Form.Control name="icon" placeholder="Icon class (e.g. fa fa-facebook)" required />
                </Form.Group>
                <Form.Group className="col-md-4">
                  <Form.Control name="link" placeholder="URL" required />
                </Form.Group>
                <div className="col-md-2">
                  <Button type="submit" variant="success" className="w-100">Add</Button>
                </div>
              </Form>

              {data.socialMedia?.length > 0 && data.socialMedia.map(item => (
                <div key={item._id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <div>
                    <i className={item.icon}></i> <strong>{item.platform}</strong> — <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a>
                  </div>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteSocial(item._id)}>Delete</Button>
                </div>
              ))}
            </Card.Body>
          </Card>
        </>
      )}

      {/* Modals */}
      <SectionModal
        show={activeModal === 'about'}
        onHide={() => setActiveModal(null)}
        title="About"
        content={data?.aboutContent}
        onSave={(val) => handleSave('about', val)}
      />
      <SectionModal
        show={activeModal === 'terms'}
        onHide={() => setActiveModal(null)}
        title="Terms & Conditions"
        content={data?.termsContent}
        onSave={(val) => handleSave('terms', val)}
      />
      <SectionModal
        show={activeModal === 'privacy'}
        onHide={() => setActiveModal(null)}
        title="Privacy Policy"
        content={data?.privacyContent}
        onSave={(val) => handleSave('privacy', val)}
      />
      <SectionModal
        show={activeModal === 'footer'}
        onHide={() => setActiveModal(null)}
        title="Footer About"
        content={data?.footerAbout}
        onSave={(val) => handleSave('footer', val)}
      />
    </div>
  );
};

export default SiteDetails;
