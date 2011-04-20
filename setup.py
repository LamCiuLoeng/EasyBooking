# -*- coding: utf-8 -*-

try:
    from setuptools import setup, find_packages
except ImportError:
    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages

setup(
    name='Clinic',
    version='0.1',
    description='',
    author='',
    author_email='',
    #url='',
    install_requires=[],
    setup_requires=["PasteScript >= 1.7"],
    paster_plugins=['Framework'],
    packages=find_packages(exclude=['ez_setup']),
    include_package_data=True,
    test_suite='nose.collector',
    tests_require=[],
    package_data={'sys2do': ['templates/*/*','public/*/*']},


    entry_points="""
    """,
)
